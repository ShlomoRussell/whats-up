import React, { createContext, useState } from 'react'


export const ConversationsContext = createContext();


export function ConversationsProvider({ children }) {
    const [conversations, setConversations] = useState([]);
    

    const{Provider}= ConversationsContext 
  return (
      <Provider value={[conversations,setConversations]}>{children}</Provider>
  )
}
