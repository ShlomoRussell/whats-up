const UserModel = require('../models/user-model');
const dal = require('../DAL/dal');
const ErrorModel = require('../models/error-model');
const jwt = require('jsonwebtoken')
const registerUser = async user => {
    const users = await dal.getAllUsersAsync();
    const isntValidName = users.find(u => u.username === user.username);
    if(isntValidName) return null;
    user = new UserModel(user);
    await dal.saveAllUsersAsync([...users, user]);

    const token = jwt.sign(user);
    return token;
};

const login = async credentials => {
    const users = await dal.getAllUsersAsync();
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    if(!user) throw new ErrorModel(401, "invalid username or password");

    return user
}

module.exports = {
    registerUser,
    login
};