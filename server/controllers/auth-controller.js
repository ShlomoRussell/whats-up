const { registerUser, login } = require("../logic/auth-logic");
const ErrorModel = require("../models/error-model");
const auth = require("express").Router();

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
  try {
    const token = await login(req.body);
    req.session.regenerate(function (err) {
      if (err) next(err);

      // store user information in session, typically a user id
      req.session.user = req.body.username;

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) return next(err);
        res.status(201).json({ token: token, loggedIn: true });
      });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = auth;
