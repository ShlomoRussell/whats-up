import React, { useEffect, useState, useContext, createRef } from "react";
import { SocketContext } from "../context/SocketProvider";
import { useAuth } from "../context/AuthContext";
import { ConversationsContext } from "../context/ConversationsProvider";
import Chat from "./Chat";
import Search from "./Search";
import { Form, Button } from "react-bootstrap";
import { BiSend } from "react-icons/bi";

function MessageInput() {
  const styleTypes = {
    sent: "bg-info bg-gradient align-self-end me-3",
    received: "bg-success bg-opacity-25 align-self-start ms-3",
  };
  const [conversations, setConverstaions] = useContext(ConversationsContext);

  const { socket, sendMessage } = useContext(SocketContext);
  const { user } = useAuth();
  //const [socket, setSocket] = useState(socketContext);

  useEffect(() => {
    //  setSocket(socketContext);
    if (socket === null) return;
    socket.on("connect", () => {
      console.log("connected");
    });
  }, [socket]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", (message) => {
      console.log(message);
      setConverstaions([
        ...conversations,
        { message: message, type: styleTypes.received },
      ]);
    });
  }, [conversations]);

  const messageRef = createRef();
  const idRef = createRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(conversations);
    setConverstaions([
      ...conversations,
      { message: messageRef.current.value, type: styleTypes.sent },
    ]);
    sendMessage(messageRef.current.value);
  };
  return (
    <div>
      <Search />
      <h4>
        {user.username} {user["id"] ? `socket id:${user.id}` : null}
      </h4>
      <Chat conversations={conversations} />
      <div className="d-flex end-0 bottom-0 w-75 position-fixed">
        <Form id="message" className="w-100" onSubmit={handleSubmit}>
          <Form.Group className="" controlId="send ">
            <Form.Control
              ref={messageRef}
              type="text"
              placeholder="Send a message"
            />
          </Form.Group>
        </Form>
        <Button
          className="align-self-end "
          variant="light"
          form="message"
          type="submit"
        >
          <BiSend />
        </Button>
      </div>
    </div>
  );
}

export default MessageInput;
