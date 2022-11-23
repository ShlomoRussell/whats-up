import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/redux/authSlice";
import { useDeleteProfilePicMutation } from "../redux/sideBarApiSlice";
import styles from "../styles/profileOffcanvas.module.css";

function RemoveProfilePicModal({ _show, toggleShow }) {
  const [show, setShow] = useState(false);
  const [deleteProfilePic] = useDeleteProfilePicMutation();
  const { image } = useSelector(selectCurrentUser);
 

  const serverError = () => alert("There was an error. Please try again");
  const onRemoveClick = async () => {
    try {
      await deleteProfilePic(image).unwrap();
      setShow(false);
    } catch (error) {
      serverError();
      setShow(false);
      console.log(error);
    }
  };

  return (
    <Modal
      backdropClassName={`${styles["modal-backdrop"]}`}
      centered
      onEnter={() => setShow(true)}
      backdrop="static"
      style={{ color: "#3b4a54" }}
      show={_show || show}
    >
      <Modal.Body className="mt-0 fw-light">
        Remove your profile photo?
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          style={{
            background: "white",
            color: "#008069",
            border: "none",
            borderRadius: "3px",
          }}
          variant="primary"
          onClick={() => setShow(false)}
        >
          CANCEL
        </Button>
        <Button
          style={{
            background: "#008069",
            color: "white",
            border: "1px solid transparent",
            borderRadius: "3px",
          }}
          variant="primary"
          onClick={onRemoveClick}
        >
          REMOVE
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveProfilePicModal;
