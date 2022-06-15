import React, { useContext, createRef, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketProvider";
import { ConversationsContext } from "../context/ConversationsProvider";
import { Form } from "react-bootstrap";
import SendMessageBtn from "./SendMessageBtn";

function MessageInput({ setMsgInptHeight }) {
  const {
    currentConversation,
    setCurrentConversation,
    currentContact,
  } = useContext(ConversationsContext);
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
      sendMessage(currentContact.id, message);
      setInputValue("");
    }
  };

  const msgInptRef = createRef();
  useEffect(() => {
    if (currentContact) {
      setMsgInptHeight(msgInptRef.current.offsetHeight);
    }
  }, [currentContact]);
  return (
    <>
      {currentContact ? (
        <div
          ref={msgInptRef}
          className="d-flex end-0 bottom-0 w-75 position-fixed"
        >
          <Form
            style={{ backgroundColor: "#F6F6F6" }}
            id="message"
            className="w-100"
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="send ">
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
      ) : null}
    </>
  );
}

export default MessageInput;
