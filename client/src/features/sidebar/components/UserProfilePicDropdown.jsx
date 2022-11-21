import React, { forwardRef, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IoIosCamera } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/redux/authSlice";
import { useUploadProfilePicMutation } from "../redux/sideBarApiSlice";
import styles from "../styles/profileOffcanvas.module.css";
import TakePictureModal from "./TakePictureModal";

const CustomToggle = forwardRef(({ onClick, isImg }, ref) => (
  <div
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <IoIosCamera className="h-50 w-50" />
    <br />

    <span>{isImg ? "CHANGE" : "ADD"} PROFILE PHOTO</span>
  </div>
));

function UserProfilePicDropdown({ isImg, isHovered, setIsHovered }) {
  const [showTakePictureModal, setShowTakePictureModal] = useState(false);
  const [uploadProfilePic] = useUploadProfilePicMutation();
  const { image } = useSelector(selectCurrentUser);
  const hiddenFileInput = useRef(null);
  const handleFileChange = async (event) => {
    const formData = new FormData();

    formData.append(
      event.target.name,
      event.currentTarget.files[0],
      event.target.value
    );

    try {
      await uploadProfilePic(formData, image);
    } catch (error) {
      console.log(error);
    }
  };

  const onUploadPhotoClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <div
      onMouseLeave={() => setIsHovered(false)}
      className={`position-absolute top-50 start-50 translate-middle d-flex ${
        styles["profile"]
      } ${isHovered ? styles["hovered"] : ""}`}
    >
      <Dropdown
        className={`h-50 w-50 mx-auto align-self-center text-center ${styles["font-size"]}`}
        autoClose="outside"
      >
        <Dropdown.Toggle
          as={CustomToggle}
          setIsHovered={setIsHovered}
          isImg={isImg}
        />

        <input
          className={styles["hidden-file"]}
          ref={hiddenFileInput}
          onChange={handleFileChange}
          type="file"
          name="profilePic"
          id=""
        />
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">View Photo</Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            onClick={() => setShowTakePictureModal(true)}
          >
            Take Photo{" "}
            <TakePictureModal
              show={showTakePictureModal}
              setShow={setShowTakePictureModal}
            />
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={onUploadPhotoClick}>
            Upload Photo
          </Dropdown.Item>
          <Dropdown.Item eventKey="4">Remove Photo</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default UserProfilePicDropdown;
