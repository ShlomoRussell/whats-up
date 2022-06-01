import React, { useContext, createRef } from "react";
import { SocketContext } from "../context/SocketProvider";
import { ConversationsContext } from "../context/ConversationsProvider";
import { Form } from "react-bootstrap";
import SendMessageBtn from "./SendMessageBtn";

function MessageInput() {
  const [conversations, setConverstaions] = useContext(ConversationsContext);
  const { sendMessage } = useContext(SocketContext);

  const messageRef = createRef();
  const idRef = createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    const id = idRef.current.value;

    if (message && id) {
      setConverstaions([
        ...conversations,
        { message: messageRef.current.value, type: "sent" },
      ]);
      sendMessage(idRef.current.value, messageRef.current.value);
    }
  };
  return (
    <>
      <div className="d-flex end-0 bottom-0 w-75 position-fixed">
        <Form id="message" className="w-100" onSubmit={handleSubmit}>
          <Form.Group className="" controlId="send ">
            <Form.Control
              ref={messageRef}
              type="text"
              placeholder="Send a message"
            />
          </Form.Group>
          <Form.Group className="" controlId="send ">
            <Form.Control ref={idRef} type="text" placeholder="id to send to" />
          </Form.Group>
        </Form>
        <SendMessageBtn />
      </div>
    </>
  );
}

export default MessageInput;
