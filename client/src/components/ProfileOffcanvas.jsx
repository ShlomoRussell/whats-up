import React, { useState } from "react";
import { Image, Offcanvas } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosCamera } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";

function ProfileOffcanvas({
  show,
  toggleOffcanvas,
  offcanvasHeaderHeight,
  imgSrc,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Offcanvas
      className="w-25"
      show={show}
      scroll={true}
      backdrop={false}
      keyboard
    >
      <Offcanvas.Header
        className="p-0"
        style={{
          backgroundColor: "#008069",
          color: "white",
        }}
      >
        <Offcanvas.Title>
          <div
            className="d-flex align-items-end w-100 mb-2 lh-1"
            style={{ height: offcanvasHeaderHeight + "px" }}
          >
            <div className="p-2" onClick={toggleOffcanvas}>
              <FiArrowLeft />
            </div>
            <h5 className="ms-3">Profile</h5>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#f8f4f4" }}>
        <div className="position-relative">
          {isHovered && (
            <div
              onMouseLeave={() => setIsHovered(false)}
              className="h-100 w-100 position-absolute d-flex"
              style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "rgba(0, 128, 105,.25)",
                borderRadius: "50%",
              }}
            >
              <div
                className="h-50 w-50 mx-auto align-self-center text-center"
                style={{ fontSize: ".7rem" }}
              >
                <IoIosCamera className="h-50 w-50" />
                <br />
                {imgSrc ? "CHANGE" : "ADD"} PROFILE PHOTO
              </div>
            </div>
          )}
          {imgSrc ? (
            <Image
              roundedCircle
              fluid
              onError={() => (imgSrc = false)}
              src={imgSrc}
              onMouseEnter={() => setIsHovered(true)}
            />
          ) : (
            <div
              className="mx-auto h-100 w-100"
              onMouseEnter={() => setIsHovered(true)}
            >
              <BsPersonCircle
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#bfc2c6",
                  color: "white",
                  borderRadius: "50%",
                }}
              />
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ProfileOffcanvas;
