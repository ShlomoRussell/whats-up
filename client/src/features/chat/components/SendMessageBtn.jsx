import React from "react";
import { Button } from "react-bootstrap";
import { BiSend } from "react-icons/bi";
import styles from "../styles/sendMessageBtn.module.css";

function SendMessageBtn() {
  return (
    <Button
      className={`align-self-end ${styles['send-btn']}` }
      variant="light"
      form="message"
      type="submit"
    >
      <BiSend className={styles["send-icon"]} />
    </Button>
  );
}

export default SendMessageBtn;
