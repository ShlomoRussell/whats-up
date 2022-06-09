const ErrorModel = require("../models/error-model");
const apiCtrl = require("express").Router();
const dal = require("../DAL/dal");
const jwt = require("jsonwebtoken");

apiCtrl.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { username } = jwt.decode(token);
  const user = await dal.getUserByUsernameAsync(username);
  res.json(user);
});

apiCtrl.get("/contact/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  const token = req.headers.authorization.split(" ")[1];

  const { id } = jwt.decode(token);

  const result = await dal
    .getUserById(id)
    .then((res) => res["contacts"].find((c) => c.id === contactId));
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

module.exports = apiCtrl;
