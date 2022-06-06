import React, { createContext, useEffect, useState } from "react";
import authentication from "../helpers/auth.helper";

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
    fetch(`http://localhost:5782/api/users/${currentContactId}`, {
      headers: { Authorization: "Bearer " + authentication.token },
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
