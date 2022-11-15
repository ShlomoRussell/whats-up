import express, { urlencoded, json } from "express";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import errorHandler from "./middleware/error.handler.js";
import ErrorModel from "./models/error.model.js";
import userCtrl from "./controllers/user.ctrl.js";
import authCtrl from "./controllers/auth.ctrl.js";
import chatCtrl from "./controllers/chat.ctrl.js";
import jwtMiddleWare from "./middleware/jwtMiddleware.js";
import socketAuthMiddleware from "./socket/socket.authMiddleware.js";
import socketHandlers from "./socket/socketHandlers.js";
import path from "path";

config();

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static("static"));
app.use("images", express.static("static/images"));

app.use("/auth", authCtrl);

app.use(jwtMiddleWare);

app.use("/api/users", userCtrl);
app.use("/api/chat", chatCtrl);

// app.get("*", function (req, res) {
//   res.sendFile(path.join(process.cwd(), "/public/index.html"));
// });

app.use(errorHandler);

const io = new Server(server, { cors: "localhost:3000" });

io.use(socketAuthMiddleware);

io.on("connection", socketHandlers);

server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
