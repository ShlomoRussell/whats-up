import React, { useEffect, useState, useContext, createRef } from "react";
import { SocketContext } from "../context/SocketProvider";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { ConversationsContext } from "../context/ConversationsProvider";

function Chat() {
const [conversations, setConverstaions] = useContext(ConversationsContext);

  const socketContext = useContext(SocketContext);
  const { user } = useAuth();
  const [socket, setSocket] = useState(socketContext);
  
  useEffect(() => {
    setSocket(socketContext);
    console.log(socket);
    if (socket == null) return;
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("receive-message", (message) => {
      console.log(message);
      setConverstaions([...conversations, message]);
    
    });
  }, [socketContext, socket,conversations]);


  
  const messageRef = createRef();
  const idRef = createRef();
  const handleClick = () => {
    socket.emit("send-message", idRef.current.value, messageRef.current.value);
  };
  return (
    <div>
      <h1>{user.username}</h1>
      <label>
        {" message"} <input type="text" ref={messageRef} />
      </label>
      <label>
        {" send to id "}
        <input type="text" ref={idRef} />
      </label>
      <button onClick={handleClick}>send</button>
      {console.log(messages)}
      {conversations.map((m) => (
        <div key={uuidv4()}>{m}</div>
      ))}
    </div>
  );
}

export default Chat;
