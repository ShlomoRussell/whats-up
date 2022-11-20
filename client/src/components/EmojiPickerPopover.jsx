import React, { useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import EmojiPicker from "emoji-picker-react";

function EmojiPickerPopover({ onEmojiClick, show, setShow, target }) {
  const ref = useRef(null);

  return (
    <div style={{ display: "inline-block" }} ref={ref}>
      <Overlay
        rootClose={true}
        show={show}
        onHide={() => setShow(!show)}
        target={target}
        placement="right"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Body
            as={EmojiPicker}
            onEmojiClick={onEmojiClick}
            width={300}
            height={300}
          />
        </Popover>
      </Overlay>
    </div>
  );
}

export default EmojiPickerPopover;
