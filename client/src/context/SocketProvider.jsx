import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import authentication from "../helpers/login.helper";

export const SocketContext = createContext();

export function SocketProvider({id, children }) {
  const [socket, setSocket] = useState(null);
console.log(id)
  useEffect(() => {
    const newSocket = io("http://localhost:5782", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true,
      query:{ id},
      auth: {
        token: authentication.token,
      },
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [authentication.loggedIn]);

  function sendMessage(recipients, message,callback) {
    socket.emit("send-message", recipients, message);
    if(callback)return callback()
  }
  
  const value = {
    socket,
    sendMessage,
  };
  const { Provider } = SocketContext;
  return <Provider value={value}> {children}</Provider>;
}
