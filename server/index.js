const express = require("express");
const errorHandler = require("../../CRUD-students/src/server/middleware/error-handler");
const app = express();
const webSocket = require("./web-socket");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;

app.use("/", express.static("public"));

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`)
);
webSocket(server);
