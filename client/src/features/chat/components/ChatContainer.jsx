import React, { useState } from "react";
import Chat from "./Chat";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import "../../../styles/scrollbar.css";

function ChatContainer() {
  const [msgInptHeight, setMsgInptHeight] = useState(0);
  const [chatHeaderHeight, setChatHeaderHeight] = useState(0);
  return (
    <div
      className="d-flex flex-column flex-grow-1 overflow-auto"
      style={{
        backgroundColor: "#F6F6F6",
        height: `calc(100vh  - ${msgInptHeight}px)`,
        paddingBottom: "1rem",
        boxSizing: "border-box",
      }}
    >
      <ChatHeader setChatHeaderHeight={setChatHeaderHeight} />
      <Chat heightToMinus={msgInptHeight} chatHeaderHeight={chatHeaderHeight} />
      <MessageInput setMsgInptHeight={setMsgInptHeight} />
    </div>
  );
}

export default ChatContainer;
