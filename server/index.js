const express = require("express");
const errorHandler = require("./middleware/error-handler");
const ErrorModel = require("./models/error-model");
const apiCtrl = require("./controllers/api-controller");
const authctrl = require("./controllers/auth-controller");
const cors = require("cors");
const jwt = require('jsonwebtoken')
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
const session = require("express-session");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const jsonwebtoken = require("jsonwebtoken");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionMiddleware = session({
  secret: "changeit",
  resave: false,
  saveUninitialized: true,
});

app.use(sessionMiddleware);
app.use("/auth", authctrl);

app.use(function (req, res, next) {
  try {
    const [type, token] = req.headers.authorization.split(" ");
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(payload);
    req.session.authorized = true;
    next();
  } catch (ex) {
    res.status(401).send();
  }
});
app.use("/api/users", apiCtrl);

app.use("*", (req, res, next) => next(new ErrorModel(404, "Route not found")));
app.use(errorHandler);

const io = new Server(server, { cors: "localhost:3000" });

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(function (socket, next) {
  console.log('hello')
  try {
    const token = socket.handshake.auth.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(payload);
    next();
  } catch (ex) {
    next(ex)
  }
});

io.on("connection", (socket) => {
  socket.on("send-message", (sendToID, message) => {
    console.log(message);
    socket.emit("receive-message", message);
  });

  console.log(`You're connect with the id:${socket.id}`);
});

server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
