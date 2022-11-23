import React, { useState } from "react";
import { Image, Modal } from "react-bootstrap";

function ViewPhoto({ src, _show, toggleShow }) {
  const [show, setShow] = useState(false);
  return (
    <Modal
      show={_show || show}
      onEnter={() => setShow(true)}
      fullscreen
      onHide={() => toggleShow() || setShow(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={src} />
      </Modal.Body>
    </Modal>
  );
}

export default ViewPhoto;
