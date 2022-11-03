import ErrorModel from "../models/error.model.js";
import { getUserById, getUserByUsername } from "../bls/users.bl.js";
import { Router } from "express";

const apiCtrl = Router();

apiCtrl.get("/contacts", async (req, res) => {
  try {
    const user = await getUserByUsername(username);
    console.log(user);
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

apiCtrl.get("/contacts/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const result = await getUserById(contactId);
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

apiCtrl.get("/search", async (req, res) => {
  const username = req.query.username;
  try {
    const user = await getUserByUsername(username);
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

apiCtrl.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await updatedUser(id, updatedUser);
    res.json(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

apiCtrl.delete("/:id", async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default apiCtrl;
