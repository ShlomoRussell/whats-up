import React, { createContext, useEffect, useState } from "react";

export const ConversationsContext = createContext();

export function ConversationsProvider({ incomingMessage, children }) {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [currentContact, setCurrentContact] = useState(null)
  useEffect(() => {
    if (incomingMessage == null || !currentContact) return;
    setCurrentConversation([...currentConversation, incomingMessage]);
  }, [incomingMessage]);

  useEffect(() => {
    if (!currentContact) return;
    fetch(`http://localhost:5782/api/users/contacts/${currentContact.id}`, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("what's-up-token")),
      },
    })
      .then((res) => res.json())
      .then((jres) =>
        setCurrentConversation([...currentConversation, ...jres.messages])
      );
  }, [currentContact]);

  const { Provider } = ConversationsContext;
  const value = {
    conversations,
    setConversations,
    currentConversation,
    setCurrentConversation,
    currentContact,
    setCurrentContact,
  };
  return <Provider value={value}>{children}</Provider>;
}
