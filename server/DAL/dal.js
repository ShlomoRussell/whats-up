const UserModel = require('../models/user-model');

const fs = require('fs').promises;

const getAllUsersAsync = () => fs.readFile(__dirname + "/../" +'database' + '/users.json')
    .then(res => JSON.parse(res));


const saveAllUsersAsync = users => fs.writeFile(__dirname + "/../"+'database'+'/users.json',JSON.stringify(users, null, 4));

/*
const UserModel = require('../models/user-model');

(function generateFakeDb(){
    const user1 = new UserModel('Shlomo Russel', 1234);
    const user2 = new UserModel('Amit Licht', 1212);
    const user3 = new UserModel('Amit Engel', 3426);
    const user4 = new UserModel('Yaakov Hatam', 8989);
    saveAllUsersAsync([user1, user2, user3,user4]);
})();
*/

module.exports = {
    getAllUsersAsync,
    saveAllUsersAsync
}
