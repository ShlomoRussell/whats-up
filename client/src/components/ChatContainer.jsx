import React from 'react'
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Chat from "./Chat";
import MessageInput from './MessageInput';

function ChatContainer() {
     const { user } = useAuth();
  return (
    <>
      <Header />
      <h4>
        {user.username} {user["id"] ? `socket id:${user.id}` : null}
      </h4>
          <Chat />
          <MessageInput />
    </>
  );
}

export default ChatContainer