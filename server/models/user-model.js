class UserModel{

    constructor(username, password){

        this.username = username;
        this.password = password;
        this.messages = [];
    }
}

module.exports = UserModel;