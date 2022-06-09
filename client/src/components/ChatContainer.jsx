import React, { createRef, useEffect, useState } from "react";
import Chat from "./Chat";
import MessageInput from "./MessageInput";
import "../styles/scrollbar.css";

function ChatContainer() {
  const [msgInptHeight, setMsgInptHeight] = useState(0);

  return (
    <div
      className="d-flex flex-column flex-grow-1 pt-4 overflow-auto"
      style={{
        backgroundColor: "#F6F6F6",
        height: `calc(100vh  - ${msgInptHeight + 24}px)`,
        paddingBottom: "3.4rem",
      }}
    >
      <Chat />
      <MessageInput setMsgInptHeight={setMsgInptHeight} />
    </div>
  );
}

export default ChatContainer;
