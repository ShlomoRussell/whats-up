const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;




app.use('/', express.static('public'));

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));