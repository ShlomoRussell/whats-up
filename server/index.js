const express = require("express");
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io"); 
const io = new Server(server, {
  cors:'localhost:3000'
})

io.on("connection", (socket) => {
  socket.on('send-message', (message) => {
    console.log(message)
    socket.emit(
      "receive-message",
      `Thank you for sending you messsage of "${message}",\n we will get back to you soon 😀`
    );
  })
 
  console.log(`You're connect with the id:${socket.id}`);
});

const errorHandler = require("./middleware/error-handler");
const ErrorModel = require("./models/error-model");
const apiCtrl = require("./controllers/api-controller");

const authctrl = require("./controllers/auth-controller");
require("dotenv").config();

//app.use('/',express.static('../client'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT 


app.use("/api/users", apiCtrl);
app.use('/auth', authctrl);

// for non existing routes or url type error
app.use("*", (req, res, next) => next(new ErrorModel(404, "Route not found")));
app.use(errorHandler);


server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
