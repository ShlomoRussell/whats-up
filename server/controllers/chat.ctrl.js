import { Router } from "express";
import ErrorModel from "../models/error.model.js";
import { deleteMessage, getContactMessages } from "../bls/chat.bl.js";

const chatCtrl = Router();

chatCtrl.get("/messages/:contactId", async (req, res, next) => {
  try {
    const messages = await getContactMessages(
      req.params.contactId,
      req.headers.id
    );
    return res.send(messages);
  } catch (error) {
    return next(new ErrorModel(500));
  }
});

chatCtrl.delete("/messages/:messageId", async (req, res, next) => {
  try {
    const deleted = await deleteMessage(req.params.messageId);
    if (deleted) {
      return res.send(deleted);
    } else {
      return next(409, "Could not delete message at this time!");
    }
  } catch (error) {
    return next(500);
  }
});

export default chatCtrl;
