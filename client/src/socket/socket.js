import { io, Socket } from "socket.io-client";

/**
 * @type {Socket}
 */
let socket;
export function getSocket(id) {
  if (!socket) {
    socket = io("http://localhost:5782", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true,
      query: { id },
      auth: {
        token: JSON.parse(localStorage.getItem("what's-up")),
      },
    });
  }
  return socket;
}
