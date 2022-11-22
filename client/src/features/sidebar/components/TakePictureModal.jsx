import React, { useRef, useCallback, useState } from "react";
import { Image, Modal } from "react-bootstrap";
import Webcam from "react-webcam";

function TakePictureModal({ show, toggleShow, onUserMediaError }) {
  const [picture, setPicture] = useState("");
  const webcamRef = useRef();
  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    console.log(pictureSrc);
    setPicture(pictureSrc);
  }, [webcamRef]);
  const handleUserMediaError = (err) => {
    console.log(err);
    onUserMediaError();
  };
  return (
    <Modal show={show} backdrop="static" onHide={toggleShow} keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Take Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {picture === "" ? (
          <Webcam
            audio={false}
            height={"375px"}
            width={"500px"}
            screenshotFormat="image/jpeg"
            onUserMediaError={handleUserMediaError}
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
          <button onClick={(e) => setPicture("")} className="btn btn-primary">
            Retake
          </button>
        ) : (
          <button onClick={capture} className="btn btn-danger">
            Capture
          </button>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default TakePictureModal;
