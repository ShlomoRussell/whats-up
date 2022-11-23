import React, { forwardRef, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IoIosCamera } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/redux/authSlice";
import { useUploadProfilePicMutation } from "../redux/sideBarApiSlice";
import TakePictureModal from "./TakePictureModal";
import CameraNotFoundModal from "./CameraNotFoundModal";
import styles from "../styles/profileOffcanvas.module.css";
import ViewPhoto from "./ViewPhoto";
import RemoveProfilePicModal from "./RemoveProfilePicModal";

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
  const toggleTakePictureModal = () =>
    setShowTakePictureModal(!showTakePictureModal);
  const [viewPhoto, setViewPhoto] = useState(false);
  const toggleViewPhoto = () => setViewPhoto(!viewPhoto);
  const [userMediaError, setUserMediaError] = useState(false);
  const toggleUserMediaError = () => setUserMediaError(!userMediaError);
  const [showRemovePhotoModal, setShowRemovePhotoModal] = useState(false);
  const toggleShowRemovePhotoModal = () =>
    setShowRemovePhotoModal(!showRemovePhotoModal);
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
      await uploadProfilePic({img:formData,oldImgPath: image});
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
          <Dropdown.Item eventKey="1" onClick={toggleViewPhoto}>
            View Photo
            <ViewPhoto
              src={`images/${image}`}
              _show={viewPhoto}
              toggleShow={toggleViewPhoto}
            />
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            onClick={() => {
              toggleTakePictureModal();
              setIsHovered(false);
            }}
          >
            Take Photo
            {userMediaError ? (
              <CameraNotFoundModal
                _show={userMediaError}
                toggleShow={toggleUserMediaError}
              />
            ) : (
              <TakePictureModal
                _show={showTakePictureModal}
                toggleShow={toggleTakePictureModal}
                onUserMediaError={toggleUserMediaError}
              />
            )}
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={onUploadPhotoClick}>
            Upload Photo
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="4"
            onClick={() => {
              toggleShowRemovePhotoModal();
              setIsHovered(false);
            }}
          >
            Remove Photo
            <RemoveProfilePicModal
              _show={showRemovePhotoModal}
              toggleShow={toggleShowRemovePhotoModal}
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default UserProfilePicDropdown;
