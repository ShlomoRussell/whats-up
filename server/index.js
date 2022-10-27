import express, { urlencoded, json } from "express";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import errorHandler from "./middleware/error.handler.js";
import ErrorModel from "./models/error.model.js";
import apiCtrl from "./controllers/api.controller.js";
import authctrl from "./controllers/auth.controller.js";
import jwtMiddleWare from "./middleware/jwtMiddleware.js";

config();

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static("static"));
app.use("images", express.static("static/images"));

app.use("/auth", authctrl);

app.use(jwtMiddleWare);

app.use("/api/users", apiCtrl);

app.get("*", function (req, res) {
  res.sendFile(require.main.path + "/static/index.html");
});

app.use("*", (req, res, next) => next(new ErrorModel(404, "Route not found")));
app.use(errorHandler);

const io = new Server(server, { cors: "localhost:3000" });

io.use(function (socket, next) {
  try {
    const token = socket.handshake.auth.token;
    const payload = verify(token, process.env.JWT_SECRET_KEY);
    console.log(payload);
    next();
  } catch (ex) {
    next(ex);
  }
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on("send-message", (sendToID, message) => {
    socket.to(sendToID).volatile.emit("receive-message", message);
  });

  console.log(`You're connect with the id:${socket.id}`);
});

server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
