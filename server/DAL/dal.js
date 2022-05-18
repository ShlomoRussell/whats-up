const fs = require('fs').promises;

const getAllUsersAsync = () => fs.readFile(__dirname + "/../" +'database' + '/users.json')
    .then(res => JSON.parse(res));


const saveAllUsersAsync = users => fs.writeFile(__dirname + "/../"+'database'+'/users.json',JSON.stringify(users, null, 4));


module.exports = {
    getAllUsersAsync,
    saveAllUsersAsync
}
