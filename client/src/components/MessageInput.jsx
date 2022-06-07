import React, { useContext, createRef, useState } from "react";
import { SocketContext } from "../context/SocketProvider";
import { ConversationsContext } from "../context/ConversationsProvider";
import { Form } from "react-bootstrap";
import SendMessageBtn from "./SendMessageBtn";


function MessageInput() {
  const { currentConversation, setCurrentConversation,currentContactId} = useContext(ConversationsContext);
  const { sendMessage } = useContext(SocketContext);
  const [inputValue, setInputValue] = useState("");
  const messageRef = createRef();



  const handleSubmit = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;

    if (message) {
      setCurrentConversation([
        ...currentConversation,
        { message: inputValue, type: "sent" },
      ]);
      sendMessage(currentContactId, message);
      setInputValue("");
    }
  };
  return (
    <>
      <div className="d-flex end-0 bottom-0 w-75 position-fixed">
        <Form id="message" className="w-100" onSubmit={handleSubmit}>
          <Form.Group className="" controlId="send ">
            <Form.Control
              value={inputValue}
              onChange={() => setInputValue(messageRef.current.value)}
              ref={messageRef}
              type="text"
              placeholder="Send a message"
            />
          </Form.Group>
        </Form>
        <SendMessageBtn />
      </div>
    </>
  );
}

export default MessageInput;
