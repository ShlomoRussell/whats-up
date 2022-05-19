const uuid = require('uuid').v4;

class UserModel{

    constructor(user){
        this.id = uuid(); 
        this.username = user.username;
        this.password = user.password;
        this.unreadMessages = [];
    }
}

module.exports = UserModel;