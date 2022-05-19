const express = require("express");
const errorHandler = require("../../CRUD-students/src/server/middleware/error-handler");
const ErrorModel = require("../../CRUD-students/src/server/model/error-model");
const app = express();
const webSocket = require("./web-socket");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

app.use("/", express.static("public"));

// for non existing routes or url type error
app.use('*', (req,res,next)=> next(new ErrorModel(404, 'Route not found'))); 
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`)
);
webSocket(server);
