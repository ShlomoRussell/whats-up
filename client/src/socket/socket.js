import { io, Socket } from "socket.io-client";

/**
 * @type { Socket}
 */
let socket;
export function getSocket() {
  if (!socket) {
    socket = io();
  }
  return socket;
}
