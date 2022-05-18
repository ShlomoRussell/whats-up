const express = require("express");

const app = express();
const webSocket = require('./web-socket');
const dotenv = require("dotenv").config();


const PORT = process.env.PORT;


app.use("/", express.static("public"));

const server = app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`)
);
webSocket(server)