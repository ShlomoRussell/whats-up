import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import authentication from "../helpers/auth.helper";
import { ConversationsProvider } from "./ConversationsProvider";

export const SocketContext = createContext();

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("http://localhost:5782", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true,
      query: { id },
      auth: {
        token: authentication.token,
      },
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const [incomingMessage, setIncomingMessage] = useState();

  function sendMessage(recipients, message, callback) {
    socket.emit("send-message", recipients, message);
    if (callback) return callback();
  }

  useEffect(() => {
    if (socket == null) return;
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("receive-message", (message) => {
      console.log(message);
      setIncomingMessage({ message: message, type: "received" });
    });
  }, [incomingMessage, setIncomingMessage, socket]);

  const value = {
    socket,
    sendMessage,
  };
  const { Provider } = SocketContext;
  return (
    <Provider value={value}>
      <ConversationsProvider incomingMessage={incomingMessage}>
        {children}
      </ConversationsProvider>
    </Provider>
  );
}
