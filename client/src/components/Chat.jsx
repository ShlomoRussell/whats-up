import React, { useContext, useEffect, useRef } from "react";
import { Stack } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { ConversationsContext } from "../context/ConversationsProvider";

const bootstrapClassTypes = {
  sent: "bg-info bg-gradient align-self-end me-3",
  received: "bg-success bg-opacity-25 align-self-start ms-3",
};
const styleTypes = {
  sent: "30px 0px 25px 15px",
  received: "0px 25px 15px 30px ",
};

function Chat({ heightToMinus, chatHeaderHeight }) {
  const { currentConversation } = useContext(ConversationsContext);
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
              className={`text-break text-wrap text-center ${
                bootstrapClassTypes[c.type]
              } border`}
              style={{
                width: "fit-content",
                height: "fit-content",
                maxWidth: "75%",
                padding: ".7rem",
                borderRadius: styleTypes[c.type],
              }}
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
