import React, { useEffect, useState, useContext, createRef } from "react";
import { SocketContext } from "../context/SocketProvider";
import { useAuth } from "../context/AuthContext";
import { ConversationsContext } from "../context/ConversationsProvider";
import Chat from "./Chat";

function MessageInput() {
  const bg = {
    sent: "bg-info bg-gradient align-self-end me-3",
    received: "bg-success bg-opacity-25 align-self-start ms-3",
  };
  const [conversations, setConverstaions] = useContext(ConversationsContext);

  const socketContext = useContext(SocketContext);
  const { user } = useAuth();
  const [socket, setSocket] = useState(socketContext);

  useEffect(() => {
    setSocket(socketContext);
    console.log(socket);
  }, [socketContext, socket]);


  useEffect(() => {
    if (socket == null) return;
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("receive-message", (message) => {
      console.log(message);
      setConverstaions([
        ...conversations,
        { message: message, type: bg.received },
      ]);
    });
  }, [conversations]);


  const messageRef = createRef();
  const idRef = createRef();
  const handleClick = () => {
    console.log(conversations)
    setConverstaions([
      ...conversations,
      { message: messageRef.current.value, type: bg.sent },
    ]);
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

      <Chat conversations={conversations} />
    </div>
  );
}

export default MessageInput;
