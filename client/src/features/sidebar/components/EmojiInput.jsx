import React, { useRef, useState, useEffect } from "react";
import CheckIcon from "../icons/CheckIcon";
import EmojiInputIcon from "../icons/EmojiInputIcon";
import PencilEditIcon from "../icons/PencilEditIcon";
import useSetEndOfLine from "../../../hooks/useSetEndOfLine";
import styles from "../styles/profileOffcanvas.module.css";

function EmojiInput({
  value,
  id,
  label,
  onCheckClick,
  onChange,
  onEmojiSelect,
}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef();
  const setEndOfLine = useSetEndOfLine();

  useEffect(() => {
    if (!isDisabled) {
      inputRef.current.focus();
      setEndOfLine(inputRef.current);
    }
  }, [isDisabled, value]);

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsDisabled(true);
      onCheckClick();
    }
    if (e.key === "Escape") {
      setIsDisabled(true);
    }
  };
  return (
    <div
      onKeyDown={!isDisabled ? handleOnKeyDown : null}
      className={`my-2 ${styles["bg-color"]} ${
        !isDisabled ? styles["underlined"] : ""
      }`}
    >
      <div>
        <label
          className="m-2"
          htmlFor={id}
          style={{ color: "#008069", fontSize: "14px" }}
        >
          {label}
        </label>
      </div>
      <div className="d-flex">
        <div style={{ width: "75%" }}>
          <div
            onInput={(e) => onChange(e.currentTarget.innerText || "")}
            ref={inputRef}
            key={value}
            suppressContentEditableWarning
            contentEditable={!isDisabled}
            className={`border-0 ms-2 mb-1 ${styles["input"]}`}
            id={id}
            role="textbox"
          >
            {value}
          </div>
        </div>

        {isDisabled ? (
          <PencilEditIcon onClick={() => setIsDisabled(false)} />
        ) : (
          <div>
            <div
              className="me-1"
              style={{
                color: "#d1d7db",
                width: "18px",
                height: "22px",
                display: "inline-block",
              }}
            >
              {label !== "About" ? 25 - value.length : <></>}
            </div>

            <EmojiInputIcon
              onEmojiClick={(emoji) => onEmojiSelect(emoji.emoji)}
            />
            <CheckIcon
              onClick={(event) => {
                setIsDisabled(true);
                onCheckClick(event);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EmojiInput;
