import React, { useContext } from "react";
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


function Chat() {

  const [conversations] = useContext(ConversationsContext);

  return (
    
      <Stack className="d-flex align-self-end w-100 overflow-auto"gap={3}>
        {conversations.map((c) => (
          <div
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
        ))}
      </Stack>
 
  );
}

export default Chat;
