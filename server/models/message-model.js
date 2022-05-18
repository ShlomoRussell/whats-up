
class MessageModel{

    from;    
    to;
    textContent; 
    time;   

    constructor(from, to, textContent){
        this.from = from;
        this.to = to;
        this.textContent = textContent;
        this.time = new Date();
    }
}

module.exports = MessageModel;