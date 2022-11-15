import React, { useEffect, useRef } from "react";
import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { selectCurrentConversation } from "../redux/chatSlice";
import styles from "../styles/chat.module.css";
const bootstrapClassTypes = {
  sent: "bg-info bg-gradient align-self-end me-3",
  received: "bg-success bg-opacity-25 align-self-start ms-3",
};

function Chat({ heightToMinus, chatHeaderHeight }) {
  const currentConversation = useSelector(selectCurrentConversation);
  const lastMessageRef = useRef();

  useEffect(() => {
    if (
      lastMessageRef.current &&
      lastMessageRef.current.offsetTop > window.innerHeight - heightToMinus
    ) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [lastMessageRef.current]);
  return (
    <div style={{ paddingTop: chatHeaderHeight }}>
      <Stack className="d-flex align-self-end pt-4 w-100 h-100" gap={3}>
        {currentConversation.map((c, i) => {
          const lastMessage = currentConversation.length - 1 === i;
          return (
            <div
              ref={lastMessage ? lastMessageRef : null}
              key={uuidv4()}
              className={`text-break text-wrap text-center chat border ${
                bootstrapClassTypes[c.type]
              } ${styles[c.type]} ${styles["chat"]}`}
            >
              {c.message}
            </div>
          );
        })}
      </Stack>
    </div>
  );
}

export default Chat;
