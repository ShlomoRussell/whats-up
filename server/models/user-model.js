const uuid = require('uuid').v4;

class UserModel{

    constructor( username, password){
        this.id = uuid(); 
        this.username = username;
        this.password = password;
        this.unreadMessages = [];
    }
}

module.exports = UserModel;