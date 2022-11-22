import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CameraNotFoundModal({ show, toggleShow }) {
  return (
    <Modal show={show} onHide={toggleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Camera Not Found</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You can't take a photo because it looks like your computer doesn't have
        a camera. Try connecting one or if you have one connected, try
        restarting you browser.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={toggleShow}>
          OK, GOT IT
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CameraNotFoundModal;
