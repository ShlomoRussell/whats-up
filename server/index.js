const express = require('express');
const app = express();
const PORT = 5782

app.use('/', express.static('public'));

app.listen(PORT,()=>console.log(`server started on port ${PORT}`));