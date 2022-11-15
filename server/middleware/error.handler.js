import ErrorModel from "../models/error.model.js";

export default function errorHandler(err, req, res, next) {
  if (err instanceof Error) {
    return res.status(err.status || 500).send(err.message);
  }
  if (err instanceof ErrorModel) {
    return res.status(err.status).send(err.message);
  }

  next();
}
