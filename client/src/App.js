import { socket } from "./socket/connect-socket";
import React, { createRef, useState } from "react";
function App() {
  const [messages, setMessages] = useState([]);
  socket.on("receive-message", (message) => {
    console.log(message);
    setMessages([...messages, message]);
  });
  const messageRef = createRef();
   const idRef = createRef();
  const handleClick = () => {
    socket.emit("send-message",idRef.current.value, messageRef.current.value);
  };

  return (
    <div>
      <label>
       {' message'} <input type="text" ref={messageRef} />
      </label>
      <label> 
      {' send to id '} 
        <input type="text" ref={idRef} />
      </label>
      <button onClick={handleClick}>send</button>
      {messages.map((m) => (
        <div>{m}</div>
      ))}
    </div>
  );
}

export default App;
