import React, { createContext, useEffect, useState } from "react";


export const ConversationsContext = createContext();

export function ConversationsProvider({ incomingMessage, children }) {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [currentContactId, setCurrentContactId] = useState("");
  useEffect(() => {
    if (incomingMessage == null) return;

    setCurrentConversation([...currentConversation, incomingMessage]);
  }, [incomingMessage]);

  useEffect(() => {
    if (!currentContactId) return;
    fetch(`http://localhost:5782/api/users/contact/${currentContactId}`, {
      headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("what's-up-token")) },
    })
      .then((res) => res.json())
      .then((jres) =>
        setCurrentConversation([...currentConversation, ...jres.messages])
      );
  }, [currentContactId]);

  const { Provider } = ConversationsContext;
  const value = {
    conversations,
    setConversations,
    currentConversation,
    setCurrentConversation,
    currentContactId,
    setCurrentContactId,
  };
  return <Provider value={value}>{children}</Provider>;
}
