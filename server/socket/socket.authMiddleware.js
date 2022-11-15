import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export default function (socket, next) {
  try {
    const token = socket.handshake.auth.token;
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (ex) {
    next(ex);
  }
}
