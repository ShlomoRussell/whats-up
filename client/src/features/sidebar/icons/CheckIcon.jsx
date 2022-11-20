import React from "react";

function CheckIcon({ onClick }) {
  return (
    <svg
      onClick={onClick}
      className="mb-1"
      color="#8696a0"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
    >
      <title>Click to save, ESC to cancel</title>
      <path
        fill="currentColor"
        d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"
      ></path>
    </svg>
  );
}

export default CheckIcon;
