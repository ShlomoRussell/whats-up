import React, { useContext, createRef, useEffect, useState } from "react";
import { ConversationsContext } from "../../../context/ConversationsProvider";
import { Form } from "react-bootstrap";
import SendMessageBtn from "./SendMessageBtn";
import { getSocket } from "../../../socket/socket";
import { SocketEvents } from "../../../socket/socketEvent";
import { useSelector } from "react-redux";
import {
  selectCurrentContactId,
  setCurrentConversation,
} from "../redux/chatSlice";

function MessageInput({ setMsgInptHeight }) {
  const { currentConversation } = useContext(ConversationsContext);
  const [inputValue, setInputValue] = useState("");
  const currentContactId = useSelector(selectCurrentContactId);
  const messageRef = createRef();
  const socket = getSocket();
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    if (message) {
      setCurrentConversation([
        ...currentConversation,
        { message: inputValue, type: "sent" },
      ]);
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
