const { registerUser, login } = require("../logic/auth-logic");
const ErrorModel = require("../models/error-model");
const auth = require("express").Router();
const jwt = require('jsonwebtoken')
require('dotenv').config()

auth.post("/register", async (req, res, next) => {
  try {
    const token = await registerUser(req.body);
    if (!token) throw new ErrorModel(404, "username already exist");
    res.status(201).json({token:token,loggedIn:true});
  } catch (err) {
    next(err);
  }
});

auth.post("/login", async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await login(req.body);
    if(user){
      const token = jwt.sign({...req.body,id:user.id}, process.env.JWT_SECRET_KEY);
      res.status(201).json({ token: token});
    }
  } catch (err) {
    next(err);
  }
});

module.exports = auth;
