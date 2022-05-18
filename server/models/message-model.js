
class MessageModel{
    id; // uuid
    from;    // user id
    to;      // user id
    textContent; 
    time;   

    constructor(id, from, to, textContent){
        this.id = id;
        this.from = from;
        this.to = to;
        this.textContent = textContent;
        this.time = new Date();
    }
}

module.exports = MessageModel;