import React, { useRef, useCallback, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { selectCurrentUser } from "../../auth/redux/authSlice";
import { useUploadProfilePicMutation } from "../redux/sideBarApiSlice";

function TakePictureModal({ _show, toggleShow, onUserMediaError }) {
  const [picture, setPicture] = useState("");
  const [show, setShow] = useState(false);
  const { image } = useSelector(selectCurrentUser);
  const [uploadPicture] = useUploadProfilePicMutation();
  const webcamRef = useRef();
  const serverError = () => alert("There was an error. Please try again");

  const savePicture = async () => {
    const formData = new FormData();
    try {
      const base64 = await fetch(picture);
      const blob = await base64.blob();
      formData.append("profilePic", blob, "profilePic.jpeg");
      await uploadPicture({ img: formData, oldImgPath: image });
      toggleShow() || setShow(false);
    } catch (error) {
      serverError();
      console.log(error);
    }
  };

  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    console.log(pictureSrc);
    setPicture(pictureSrc);
  }, [webcamRef]);

  return (
    <Modal
      onEnter={() => setShow(true)}
      centered
      show={_show || show}
      backdrop="static"
      onHide={() => setShow(false)}
      keyboard={false}
    >
      <Modal.Header
        style={{
          backgroundColor: "#008069",
          color: "white",
        }}
        closeButton
      >
        <Modal.Title>Take Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-0">
        {picture === "" ? (
          <Webcam
            className="m-0"
            audio={false}
            height={"375px"}
            width={"100%"}
            screenshotFormat="image/jpeg"
            onUserMediaError={() => {
              setShow(false);
              onUserMediaError();
            }}
            videoConstraints={{
              width: 500,
              height: 375,
              facingMode: "user",
            }}
            ref={webcamRef}
          />
        ) : (
          <Image src={picture} />
        )}
        {picture !== "" ? (
          <>
            <Button onClick={(e) => setPicture("")}>Retake</Button>
            <Button onClick={savePicture}>Save</Button>
          </>
        ) : (
          <Button variant="danger" onClick={capture}>
            Capture
          </Button>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default TakePictureModal;
