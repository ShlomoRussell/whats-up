import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../styles/profileOffcanvas.module.css";

function CameraNotFoundModal({ _show, toggleShow }) {
  const [show, setShow] = useState(false);

  return (
    <Modal
      backdropClassName={`${styles["modal-backdrop"]}`}
      centered
      backdrop="static"
      onEnter={() => setShow(true)}
      style={{ color: "#3b4a54" }}
      show={_show || show}
    >
      <Modal.Header className="border-0">
        <Modal.Title id="contained-modal-title-vcenter" className="fw-normal">
          Camera Not Found
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mt-0 fw-light">
        You can't take a photo because it looks like your computer doesn't have
        a camera. Try connecting one or if you have one connected, try
        restarting you browser.
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          style={{
            background: "#008069",
            color: "white",
            border: "none",
            borderRadius: "3px",
          }}
          variant="primary"
          onClick={() => toggleShow() || setShow(false)}
        >
          OK, GOT IT
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CameraNotFoundModal;
