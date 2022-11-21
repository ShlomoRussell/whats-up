import React, { useState } from "react";
import EmojiPickerPopover from "../../../components/EmojiPickerPopover";

function EmojiInputIcon({ onEmojiClick }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <>
      <EmojiPickerPopover
        onEmojiClick={onEmojiClick}
        setShow={setShow}
        show={show}
        target={target}
      />
      <svg
        cursor="pointer"
        onClick={handleClick}
        color="#8696a0"
        viewBox="0 0 20 20"
        height="20"
        width="20"
        preserveAspectRatio="xMidYMid meet"
        className="mb-1"
        version="1.1"
        x="0px"
        y="0px"
        enableBackground="new 0 0 20 20"
      >
        <title>Open emojis panel</title>
        <path
          fill="currentColor"
          d="M9.5,1.7C4.8,1.7,1,5.5,1,10.2s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S14.2,1.7,9.5,1.7z  M9.5,17.6c-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S13.6,17.6,9.5,17.6z"
        ></path>
        <path
          fill="currentColor"
          d="M6.8,9.8C7.5,9.7,8,9.1,7.9,8.4C7.8,7.8,7.4,7.3,6.8,7.3C6.1,7.3,5.6,8,5.7,8.7 C5.7,9.3,6.2,9.7,6.8,9.8z"
        ></path>
        <path
          fill="currentColor"
          d="M13.9,11.6c-1.4,0.2-2.9,0.3-4.4,0.4c-1.5,0-2.9-0.1-4.4-0.4c-0.2,0-0.4,0.1-0.4,0.3 c0,0.1,0,0.2,0,0.2c0.9,1.8,2.7,2.9,4.7,3c2-0.1,3.8-1.2,4.8-3c0.1-0.2,0-0.4-0.1-0.5C14.1,11.6,14,11.6,13.9,11.6z M9.8,13.6 c-2.3,0-3.5-0.8-3.7-1.4c2.3,0.4,4.6,0.4,6.9,0C13,12.3,12.6,13.6,9.8,13.6L9.8,13.6z"
        ></path>
        <path
          fill="currentColor"
          d="M12.2,9.8c0.7-0.1,1.2-0.7,1.1-1.4c-0.1-0.6-0.5-1.1-1.1-1.1c-0.7,0-1.2,0.7-1.1,1.4 C11.2,9.3,11.6,9.7,12.2,9.8z"
        ></path>
      </svg>
    </>
  );
}

export default EmojiInputIcon;
