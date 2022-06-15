import React, { createRef, useEffect, useState } from "react";
import Chat from "./Chat";
import Header from "./Header";
import MessageInput from "./MessageInput";
import "../styles/scrollbar.css";

function ChatContainer() {
  const [msgInptHeight, setMsgInptHeight] = useState(0);
  
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
      <Header />
      <Chat heightToMinus={msgInptHeight} />
      <MessageInput setMsgInptHeight={setMsgInptHeight} />
    </div>
  );
}

export default ChatContainer;
