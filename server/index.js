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
const server = require("http").createServer(app);
const { Server } = require("socket.io");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use("/auth", authctrl);

app.use(function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (ex) {
    res.status(401).send();
  }
});

app.use("/api/users", apiCtrl);


/*app.get('*', function(req, res) {
    res.sendFile(__dirname + '/server/static/index.html');
});*/

app.use("*", (req, res, next) => next(new ErrorModel(404, "Route not found")));
app.use(errorHandler);

const io = new Server(server, { cors: "localhost:3000" });



io.use(function (socket, next) {
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
  const id = socket.handshake.query.id
  socket.join(id)
  socket.on("send-message", (sendToID, message) => {
    socket.to(sendToID).volatile.emit("receive-message", message);
    
  });

  console.log(`You're connect with the id:${socket.id}`);
});

server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
