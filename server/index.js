const express = require("express");
const errorHandler = require("./middleware/error-handler");
const ErrorModel = require("./models/error-model");
const apiCtrl = require("./controllers/api-controller");
const app = express();
const webSocket = require("./web-socket");
require("dotenv").config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT = process.env.PORT;

app.use("/", express.static("public"));
app.use('/api/users', apiCtrl);

// for non existing routes or url type error
app.use('*', (req,res,next)=> next(new ErrorModel(404, 'Route not found'))); 
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`)
);

webSocket(server);
