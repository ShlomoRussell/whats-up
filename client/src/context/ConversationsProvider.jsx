import React, { createContext, useEffect, useState } from "react";

export const ConversationsContext = createContext();

export function ConversationsProvider({ incomingMessage, children }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (incomingMessage == null) return;

    setConversations([...conversations, incomingMessage]);
    console.log(conversations);
  }, [incomingMessage]);

  const { Provider } = ConversationsContext;

  return (
    <Provider value={[conversations, setConversations]}>{children}</Provider>
  );
}
