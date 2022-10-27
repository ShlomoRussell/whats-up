import ErrorModel from "../models/error.model.js";
import { Router } from "express";

const apiCtrl = Router();

apiCtrl.get("/contacts", async (req, res) => {
  const user = await getUserByUsernameAsync(username);
  console.log(user);
  res.json(user);
});

apiCtrl.get("/contacts/:contactId", async (req, res) => {
  const contactId = req.params.contactId;

  const result = await getUserById(id).then((res) =>
    res["contacts"].find((c) => c.id === contactId)
  );
  res.send(result);
});

apiCtrl.get("/search", async (req, res, next) => {
  const username = req.query.username;
  const user = await logic.getUserByUsernameAsync(username);
  if (!user) return next(new ErrorModel(404, "id not found"));
  res.json(user);
});

apiCtrl.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const user = await logic.updateUserAsync(id, updatedUser);
  if (!user) return next(new ErrorModel(404, "id not found"));
  res.json(user);
});

apiCtrl.delete("/:id", async (req, res) => {
  await logic.deleteUserAsync(req.params.id);
  res.sendStatus(204);
});

export default apiCtrl;
