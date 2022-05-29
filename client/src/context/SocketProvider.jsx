import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import authentication  from "../helpers/login.helper";



export const SocketContext = createContext();



export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      const newSocket = io("http://localhost:5782", {
        path: "/socket.io",
        transports: ["websocket"],
        secure: true,
        auth: {
          token: authentication.token,
        },
      });
      setSocket(newSocket);
      console.log(socket)
    return () => newSocket.close();
  }, [authentication.loggedIn]);
    
    const {Provider}=SocketContext
  return (
      <Provider value={socket}> {children}</Provider>
  );
}
