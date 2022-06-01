import React from "react";
import { Button } from "react-bootstrap";
import { BiSend } from "react-icons/bi";

function SendMessageBtn() {
  return (
    <Button
      style={{ backgroundColor: "#17CE3E" }}
      className="align-self-end "
      variant="light"
      form="message"
      type="submit"
    >
      <BiSend style={{ width: "5rem", height: "1.5rem" }} />
    </Button>
  );
}

export default SendMessageBtn;
