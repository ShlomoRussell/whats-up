import React, { useEffect, useState,useContext,createRef } from 'react'
import { SocketContext } from '../context/SocketProvider';
import { v4 as uuidv4 } from "uuid";
function Messages() {
     const socketContext = useContext(SocketContext);

     const [socket, setSocket] = useState(socketContext);
     const [messages, setMessages] = useState([]);
     useEffect(() => {
       setSocket(socketContext);
       console.log(socket);
       if (socket == null) return;

       socket.on("receive-message", (message) => {
         console.log(message);
         setMessages([...messages, message]);
       });
     }, [socketContext, socket]);

    const messageRef = createRef();
    const idRef = createRef();
    const handleClick = () => {
      socket.emit(
        "send-message",
        idRef.current.value,
        messageRef.current.value
      );
    };
  return (
    <div>
      <label>
        {" message"} <input type="text" ref={messageRef} />
      </label>
      <label>
        {" send to id "}
        <input type="text" ref={idRef} />
      </label>
      <button onClick={handleClick}>send</button>
      {messages.map((m) => (
        <div key={uuidv4()}>{m}</div>
      ))}
    </div>
  );
}

export default Messages