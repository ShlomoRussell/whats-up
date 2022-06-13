const ErrorModel = require("../models/error-model");
const auth = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const dal = require("../DAL/dal");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const saltRounds = 10;

const registerSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  username: Joi.string().min(6).max(40).required(),
  password: Joi.string().min(6).max(40).required(),
  confirmPassword: Joi.ref("password"),
});

auth.post("/register", async (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);
  const userExistAlready = await dal.getUserByUsernameAsync(value.username);
  const newId = uuidv4();
  if (!userExistAlready) {
    bcrypt.hash(value.password, saltRounds, function (err, hash) {
      console.log(hash);
      console.log({ ...value, id: newId });
      const token = jwt.sign({ username: value.username,id:newId },process.env.JWT_SECRET_KEY);
      res.status(201).json({ token: token, id: newId });
    });
  }
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

auth.post("/login", async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { username } = req.body;
  try {
    const user = await dal.getUserByUsernameAsync(username);
    console.log(user);
    if (user) {
      const token = jwt.sign(
        { ...req.body, id: user.id },
        process.env.JWT_SECRET_KEY
      );
      res.status(201).json({ id: user.id, token: token });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = auth;
