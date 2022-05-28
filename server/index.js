const express = require("express");
const errorHandler = require("./middleware/error-handler");
const ErrorModel = require("./models/error-model");
const apiCtrl = require("./controllers/api-controller");
const authctrl = require("./controllers/auth-controller");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io"); 
const io = new Server(server, { cors:'localhost:3000' })


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use("/api/users", apiCtrl);
app.use('/auth', authctrl);
io.on("connection", (socket) => {
  socket.on("send-message", (sendToID, message) => {
    console.log(message);
    socket.to(sendToID).emit("receive-message", message);
  });

  console.log(`You're connect with the id:${socket.id}`);
});

app.use("*", (req, res, next) => next(new ErrorModel(404, "Route not found")));
app.use(errorHandler);

server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
