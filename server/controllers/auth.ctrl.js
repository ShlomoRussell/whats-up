import { Router } from "express";
import jwt from "jsonwebtoken";
import { hash as _hash, compare } from "bcrypt";
import { config } from "dotenv";
import { addUser, getUserById, getUserByUsername } from "../bls/users.bl.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validationMiddleware.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";
import ErrorModel from "../models/error.model.js";
config();

const auth = Router();
const saltRounds = 10;

auth.post("/register", validateRegister, async (req, res, next) => {
  const user = req.body;
  try {
    const hash = await _hash(user.password, saltRounds);

    delete user["confirmPassword"];

    const newUser = await addUser({
      ...user,
      password: hash,
    });

    res.status(201).send(true);
  } catch (error) {
    if (error.message.split(' ')[0] === "Duplicate") {
      return next(new ErrorModel(409, "Username already exist! Please try a different one!"));
    }
    return next(new ErrorModel(500));
  }
});

auth.post("/login", validateLogin, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    const result = await compare(password, user.password);
    if (!result) {
      return next(new ErrorModel(404, "Incorrect password!"));
    }

    const token = jwt.sign(
      { username: req.body.username, id: user.id },
      process.env.SECRET_KEY
    );
    return res.status(201).json({ id: user.id, token: token });
  } catch (error) {
    console.log(error);
    next(new ErrorModel(404, "Username not found!"));
  }
});

auth.get("/user/refresh", jwtMiddleware, async (req, res, next) => {
  try {
    const user = await getUserById(req.headers.id);
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.SECRET_KEY
    );
    return res.send({ ...user, token });
  } catch (error) {
    console.log(error);
    return next(new ErrorModel(500));
  }
});

export default auth;
