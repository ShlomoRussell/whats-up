import { Socket } from "socket.io";
/**
 * @type {Socket}
 */
let _socket;

/**
 * @param {Socket} socket
 */
export default function (socket) {
  _socket = socket;
  socket.userId = socket.handshake.query.id;
  socket.join(socket.userId);
  socket.on("send-message", sendMessageHandler);

  console.log(`You're connect with the id:${socket.userId}`);
}

/**
 * @param {string} sendToID
 * @param {{message:string,type:string}} message
 */
function sendMessageHandler(sendToID, message) {
  _socket
    .to(sendToID)
    .volatile.emit("receive-message", { from: _socket.userId, message });
}
