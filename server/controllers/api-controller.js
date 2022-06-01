const ErrorModel = require('../models/error-model');
const logic = require('../logic/user-logic');
const apiCtrl = require('express').Router();


apiCtrl.get('/', async (req,res,next)=> {
    const users = await logic.getAllUsersAsync();
    res.json(users);
});

apiCtrl.get('/search', async (req,res,next)=> {
    const username = req.query.username
    const user = await logic.getUserByUsernameAsync(username);
    if(!user) return next(new ErrorModel(404, 'id not found'));
    res.json(user);
});


apiCtrl.put('/:id', async (req,res,next)=> {
    const id = req.params.id;
    const updatedUser = req.body;
    const user = await logic.updateUserAsync(id, updatedUser);
    if(!user) return next(new ErrorModel(404, 'id not found'));
    res.json(user);
});

apiCtrl.delete('/:id', async (req,res)=> {
    await logic.deleteUserAsync(req.params.id);
    res.sendStatus(204);
});

module.exports = apiCtrl;
