import jwt from "jsonwebtoken";
import { config } from "dotenv";
import express from "express";
import ErrorModel from "../models/error.model.js";

config();
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export default function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.headers.id = payload.id;
    next();
  } catch (ex) {
    return next(new ErrorModel(401));
  }
}
