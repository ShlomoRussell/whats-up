import React, { useRef, useState } from "react";
import { Image, Offcanvas } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosCamera } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../styles/profileOffcanvas.module.css";
function ProfileOffcanvas({
  show,
  toggleOffcanvas,
  offcanvasHeaderHeight,
  imgSrc,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hiddenFileInput = useRef(null);
  const onProfilePicClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
  };

  const handlePublicNameChange = (event) => {
    console.log(event.target.value);
  };
  const handleAboutChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <Offcanvas
      className="w-25"
      show={show}
      scroll={true}
      backdrop={false}
      keyboard
    >
      <Offcanvas.Header className={`p-0 ${styles["header"]}`}>
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
      <Offcanvas.Body className={`p-0 ${styles["body"]}`}>
        <div className="position-relative ">
          {isHovered && (
            <div
              onMouseLeave={() => setIsHovered(false)}
              className={`h-100 w-100 position-absolute d-flex ${styles["profile-hovered"]}`}
            >
              <div
                className={`h-50 w-50 mx-auto align-self-center text-center ${styles["font-size"]}`}
              >
                <IoIosCamera className="h-50 w-50" />
                <br />
                <input
                  className={styles["hidden-file"]}
                  ref={hiddenFileInput}
                  onChange={handleFileChange}
                  type="file"
                  name=""
                  id=""
                />
                <span onClick={onProfilePicClick}>
                  {imgSrc ? "CHANGE" : "ADD"} PROFILE PHOTO
                </span>
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
              <BsPersonCircle id={styles["placeholder-person"]} />
            </div>
          )}
        </div>
        <div className={`my-2 ${styles["bg-color"]}`}>
          <div>
            <label htmlFor="publicName">Your Name</label>
          </div>
          <input
            className={`border-0 ${styles["input"]}`}
            onClick={handlePublicNameChange}
            type="text"
            name=""
            id="publicName"
          />
        </div>
        <div>
          This is not your username or pin. This name will be visible to your
          What'sUp contacts.
        </div>
        <div className={`my-2 ${styles["bg-color"]}`}>
          <div>
            <label htmlFor="about">About</label>
          </div>
          <input
            className={`border-0 ${styles["input"]}`}
            onClick={handleAboutChange}
            type="text"
            name=""
            id="about"
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ProfileOffcanvas;
