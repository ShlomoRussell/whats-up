import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/redux/authSlice";
import { Image, Offcanvas } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import UserProfilePicDropdown from "./UserProfilePicDropdown";
import styles from "../styles/profileOffcanvas.module.css";
import EmojiInput from "./EmojiInput";
import {
  useChangeAboutMutation,
  useChangePublicNameMutation,
} from "../redux/sideBarApiSlice";

function ProfileOffcanvas({ show, toggleOffcanvas, offcanvasHeaderHeight }) {
  const { username, about, image } = useSelector(selectCurrentUser);
  const [changePublicName] = useChangePublicNameMutation();
  const [changeAbout] = useChangeAboutMutation();
  const [isHovered, setIsHovered] = useState(false);
  const [publicName, setPublicName] = useState("");
  const [aboutValue, setAboutValue] = useState("");

  useEffect(() => {
    setPublicName(username);
    setAboutValue(about);
  }, [username, about]);

  const serverError = () => alert("There was an error. Please try again");

  const handlePublicNameChange = async (event) => {
    try {
      await changePublicName(publicName).unwrap();
    } catch (error) {
      serverError();
      console.log(error);
    }
  };

  const handleAboutChange = async (event) => {
    try {
      await changeAbout(aboutValue).unwrap();
    } catch (error) {
      serverError();
      console.log(error);
    }
  };

  return (
    <Offcanvas className="w-25" show={show} backdrop={false} keyboard scroll>
      <Offcanvas.Header className={`p-0 ${styles["header"]}`}>
        <Offcanvas.Title>
          <div
            className="d-flex align-items-end w-100 mb-2 lh-1 ps-3"
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
        <div className="h-100 w-100">
          <div className="position-relative h-50 w-100 ">
            <UserProfilePicDropdown
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              isImg={image}
            />
            {image ? (
              <div>
                <div
                  className="position-absolute top-50 start-50 translate-middle "
                  style={{ width: "200px", height: "200px" }}
                  onMouseEnter={() => setIsHovered(true)}
                >
                  <Image
                    roundedCircle
                    fluid
                    src={"/images/" + image}
                    className="h-100 w-100"
                  />
                </div>
              </div>
            ) : (
              <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{ width: "200px", height: "200px" }}
                onMouseEnter={() => setIsHovered(true)}
              >
                <BsPersonCircle id={styles["placeholder-person"]} />
              </div>
            )}
          </div>
          <EmojiInput
            id="publicName"
            onCheckClick={handlePublicNameChange}
            label="Your Name"
            value={publicName}
            onEmojiSelect={(emoji) =>
              setPublicName(
                publicName.length < 25 ? publicName + emoji : publicName
              )
            }
            onChange={(value) =>
              setPublicName(publicName.length < 25 ? value : publicName)
            }
          />
          <div className="text-muted m-2" style={{ fontSize: "14px" }}>
            This is not your username or pin. This name will be visible to your
            What's Up contacts.
          </div>
          <EmojiInput
            id="about"
            label="About"
            onCheckClick={handleAboutChange}
            value={aboutValue}
            onEmojiSelect={(emoji) => setAboutValue(aboutValue + emoji)}
            onChange={(value) => setAboutValue(value)}
          />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ProfileOffcanvas;
