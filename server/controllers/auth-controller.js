const { registerUser, login } = require('../logic/auth-logic');
const ErrorModel = require('../models/error-model');
const auth = require('express').Router();


auth.post('/register', async (req,res,next)=> {
    try{
        const token = await registerUser(req.body);
        if(!token) throw new ErrorModel(404, 'username already exist');
        res.status(201).json(token);
    }
    catch(err){ next(err) }
});

auth.post('/login', async (req,res,next)=> {
    try{
        const token = await login(req.body);
        res.status(201).json(token);
    }
    catch(err){ next(err) }
});



module.exports = auth;