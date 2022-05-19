const dal = require('../DAL/dal');

const getAllUsersAsync = async () => dal.getAllUsersAsync();

const getUserByIdAsync = async id => {
    const user = await dal.getAllUsersAsync().then(res => res.find(u => u.id === id));
    if(!user) return null;
    return user; 
};

const createUserAsync = async user => {
    const users = await dal.getAllUsersAsync();
    const isntValidName = users.find(u => u.username === user.username);
    if(isntValidName) return null;
    await dal.saveAllUsersAsync([...users, user]);
    return user;
};

const updateUserAsync = async (userId, changedParams) => {
    const users = await dal.getAllUsersAsync();
    const idx = users.findIndex(u => u.id === userId);
    if(idx === -1) return null;
    users[idx] = {...users[idx], ...changedParams};
    dal.saveAllUsersAsync(users);
    return users[idx];
}

const deleteUserAsync = id => dal.getAllUsersAsync()
    .then(users => users.filter(u => u.id !== id)).then(res => dal.saveAllUsersAsync(res));


module.exports = {
    getAllUsersAsync,
    getUserByIdAsync,
    createUserAsync,
    updateUserAsync,
    deleteUserAsync
}