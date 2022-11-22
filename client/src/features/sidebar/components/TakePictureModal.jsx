import React, { useRef, useCallback, useState } from "react";
import { Image, Modal } from "react-bootstrap";
import Webcam from "react-webcam";

function TakePictureModal({ _show, toggleShow, onUserMediaError }) {
  const [picture, setPicture] = useState("");
  const [show, setShow] = useState(false);
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
    <Modal
      onEnter={() => setShow(true)}
      show={_show || show}
      backdrop="static"
      onHide={toggleShow}
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
