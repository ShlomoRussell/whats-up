const webSocket = require("ws");
const queryString = require('query-string');


const attachExpressToWebSocket = async (expressServer) => {

  const webSocketServer = new webSocket.Server({
    noServer: true,
    path: "/websockets",
  });
    
    
 expressServer.on("upgrade", (request, socket, head) => {
   webSocketServer.handleUpgrade(request, socket, head, (websocket) => {
     webSocketServer.emit("connection", websocket, request);
   });
     
     
     webSocketServer.on('connection', (webSocketConnection, connectionRequest) => {
         const [_path, params] = connectionRequest?.url?.split('?');
         const connectionParams = queryString.parse(params);
         console.log(connectionParams);
         


         webSocketConnection.on('message', (message) => {
             const parsedMessage = JSON.parse(message);
             console.log(parsedMessage);
             webSocketConnection.send(JSON.stringify({message:'There will be gold in the hills.'}))
         })
     })
 });
  return webSocketServer;
};


module.exports = attachExpressToWebSocket;