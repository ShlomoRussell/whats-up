import ErrorModel from "../models/error.model.js";
import { getUserById, getUserByUsername } from "../bls/users.bl.js";
import { Router } from "express";

const userCtrl = Router();

userCtrl.get("/contacts", async (req, res, next) => {
  try {
    const user = await getUserByUsername(username);
    console.log(user);
    res.json(user);
  } catch (error) {
    return next(new ErrorModel(500));
  }
});

userCtrl.get("/contacts/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const result = await getUserById(contactId);
    res.send(result);
  } catch (error) {
    return next(new ErrorModel(500));
  }
});

userCtrl.get("/search", async (req, res, next) => {
  const username = req.query.username;
  try {
    const user = await getUserByUsername(username);
    res.json(user);
  } catch (error) {
    return next(new ErrorModel(500));
  }
});

userCtrl.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await updatedUser(id, updatedUser);
    res.json(user);
  } catch (error) {
    return next(new ErrorModel(500));
  }
});

userCtrl.delete("/:id", async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    return next(new ErrorModel(500));
  }
});

export default userCtrl;
