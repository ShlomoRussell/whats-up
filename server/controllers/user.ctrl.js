import { Router } from "express";
import fileUpload from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import { join } from "path";
import { cwd } from "process";
import { unlinkSync } from "fs";
import ErrorModel from "../models/error.model.js";
import {
  deleteProfilePic,
  getUserById,
  getUserByUsername,
  updateAbout,
  updateProfilePic,
  updateUsername,
} from "../bls/users.bl.js";

const userCtrl = Router();
userCtrl.use(
  fileUpload({
    createParentPath: true,
  })
);
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

userCtrl.get("/newChat/:username", async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await getUserByUsername(username);
    res.json(user);
  } catch (error) {
    return next(new ErrorModel(500));
  }
});

userCtrl.put("/name", async (req, res, next) => {
  const id = req.headers.id;
  try {
    const user = await updateUsername(id, req.body.name);
    res.json(user);
  } catch (error) {
    console.log(error);
    return next(new ErrorModel(500));
  }
});

userCtrl.put("/about", async (req, res, next) => {
  const id = req.headers.id;
  try {
    const user = await updateAbout(id, req.body.about);
    res.json(user);
  } catch (error) {
    console.log(error);
    return next(new ErrorModel(500));
  }
});

userCtrl.put("/img/:oldImgPath", async (req, res, next) => {
  const id = req.headers.id;
  let newFileName;
  if (req.files) {
    const uploadedfile = req.files.profilePic;
    const originalFileExtension = uploadedfile.name.split(".")[1];
    const fileExtension =
      originalFileExtension == "jfif" ? "jpeg" : originalFileExtension;
    newFileName = uuidv4() + "." + fileExtension;
    const uploadPath = join(process.cwd(), "/uploads/", newFileName);

    uploadedfile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        return next(500, err);
      }
    });
  }
  try {
    const update = await updateProfilePic(id, newFileName);
    if (req.params.oldImgPath !== "null") {
      console.log(req.params.oldImgPath);
      unlinkSync(join(cwd(), "uploads", req.params.oldImgPath));
    }
    res.send({ image: newFileName });
  } catch (error) {
    console.log(error);
    return next(new ErrorModel(500));
  }
});

userCtrl.delete("/img", async (req, res, next) => {
  const id = req.headers.id;

  try {
    const deleted = await deleteProfilePic(id);
    if (deleted) {
      unlinkSync(join(cwd(), "uploads", req.body.oldImgPath));
    } else {
      next(409);
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
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
