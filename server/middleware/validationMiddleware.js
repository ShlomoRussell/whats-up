import Joi from "joi";
import express from "express";
import ErrorModel from "../models/error.model.js";

const registerSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  username: Joi.string().min(6).max(40).required(),
  password: Joi.string().min(6).max(40).required(),
  confirmPassword: Joi.ref("password"),
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export function validateRegister(req, res, next) {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    const errorMessage =
      error.message == '"confirmPassword" must be [ref:password]'
        ? "Confirm Password and password must match"
        : error.message;
    return next(new ErrorModel(400, errorMessage));
  }
  next();
}

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

export function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(new ErrorModel(400, error.message));
  }

  next();
}
