import React from "react";
import Chat from "./Chat";
import MessageInput from "./MessageInput";



function ChatContainer() {
  return (
    <div
      className="d-flex flex-column flex-grow-1 pt-4 vh-100 overflow-hidden"
      style={{ backgroundColor: "#F6F6F6"}}
    >
      <Chat />
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
