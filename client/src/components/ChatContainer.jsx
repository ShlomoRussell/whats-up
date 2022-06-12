import React, { createRef, useEffect, useState } from "react";
import Chat from "./Chat";
import MessageInput from "./MessageInput";
import "../styles/scrollbar.css";

function ChatContainer({ headerHeight }) {
  const [msgInptHeight, setMsgInptHeight] = useState(0);

  return (
    <div
      className="d-flex flex-column flex-grow-1 pt-4 overflow-auto"
      style={{
        backgroundColor: "#F6F6F6",
        height: `calc(100vh  - ${msgInptHeight + headerHeight}px)`,
        paddingBottom: "1rem",
        boxSizing: "border-box"
      }}
    >
      <Chat heightToMinus={msgInptHeight+headerHeight} />
      <MessageInput setMsgInptHeight={setMsgInptHeight} />
    </div>
  );
}

export default ChatContainer;
