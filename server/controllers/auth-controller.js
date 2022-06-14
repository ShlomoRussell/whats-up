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
  console.log(error);
  if (error) {
    const errorMessage =
      error.message == '"confirmPassword" must be [ref:password]'
        ? "Confirm Password and password must match"
        : error.message;
    return res.status(400).send(errorMessage);
  }

  const userExistAlready = await dal.getUserByUsernameAsync(value.username);

  const newId = uuidv4();

  if (userExistAlready)
    return res
      .status(409)
      .send("Username already exist! Please try a different one!");

  const hash = await bcrypt.hash(value.password, saltRounds);

  delete value["confirmPassword"];

  dal.addUser({ ...value, id: newId, password: hash, contacts: [null] });

  const token = jwt.sign(
    { username: value.username, id: newId },
    process.env.JWT_SECRET_KEY
  );

  res.status(201).json({ token: token, id: newId });
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

auth.post("/login", async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { username, password } = req.body;

  const user = await dal.getUserByUsernameAsync(username);
  if (!user) return res.status(404).send("Username not found!");

  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.status(404).send("Incorrect password!");

  const token = jwt.sign(
    { username: req.body.username, id: user.id },
    process.env.JWT_SECRET_KEY
  );
  res.status(201).json({ id: user.id, token: token });
});

module.exports = auth;
