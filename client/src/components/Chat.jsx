import React from 'react'
import { Stack } from 'react-bootstrap';
import { v4 as uuidv4 } from "uuid";

function Chat({conversations}) {
  
  return (
    <Stack className="d-flex" gap={3}>
      {conversations.map((c) => (
        <div
          key={uuidv4()}
          className={` rounded-pill text-center w-25 ${c.type} border`}
        >
          {c.message}
        </div>
      ))}
    </Stack>
  );
}

export default Chat