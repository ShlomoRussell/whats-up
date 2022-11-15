import React, { createRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import SendMessageBtn from "./SendMessageBtn";
import { getSocket } from "../../../socket/socket";
import { SocketEvents } from "../../../socket/socketEvent";
import { useSelector } from "react-redux";
import {
  selectCurrentContactId,
  setCurrentConversation,
} from "../redux/chatSlice";
import styles from "../styles/messageInput.module.css";

function MessageInput({ setMsgInptHeight }) {
  const [inputValue, setInputValue] = useState("");
  const currentContactId = useSelector(selectCurrentContactId);
  const messageRef = createRef();
  const socket = getSocket();
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = { message: messageRef.current.value, type: "sent" };
    if (message) {
      setCurrentConversation(message);
      socket.emit(SocketEvents.sendMesssage, currentContactId, message);
      setInputValue("");
    }
  };

  const msgInptRef = createRef();
  useEffect(() => {
    if (currentContactId) {
      setMsgInptHeight(msgInptRef.current.offsetHeight);
    }
  }, [currentContactId]);
  return (
    <>
      {currentContactId ? (
        <div
          ref={msgInptRef}
          className="d-flex end-0 bottom-0 w-75 position-fixed"
        >
          <Form
            id={styles["message"]}
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
