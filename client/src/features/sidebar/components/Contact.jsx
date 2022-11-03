import React from "react";
import { Badge, Button } from "react-bootstrap";
import ContactProfilePic from "../../chat/components/ContactProfilePic";
import "../styles/activeContact.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentChat, setCurrentChat } from "../../chat/redux/chatSlice";
import { selectNotificationById } from "../redux/sideBarSlice";

function Contact({ contact }) {
  const dispatch = useDispatch();
  const currentContact = useSelector(selectCurrentChat);
  const notification = useSelector((state) =>
    selectNotificationById(state, currentContact.id)
  );
  const handleClick = (e) => {
    if (!currentContact || currentContact.id !== contact.id) {
      dispatch(
        setCurrentChat({
          id: contact.id,
          name: contact.username,
          image: contact.image,
        })
      );
    }
  };

  return (
    contact && (
      <Button
        onClick={handleClick}
        className={`list-group-item py-3 lh-tight w-100 ${
          currentContact && currentContact.id === contact.id ? "active" : ""
        }`}
      >
        <div className="d-flex  w-100">
          <ContactProfilePic
            height="40%"
            width="20%"
            contactProfilePic={contact.image}
          />
          <div style={{ minWidth: 0, flexShrink: 15, textAlign: "left" }}>
            <h6
              title={contact.username}
              className="m-1 overflow-hidden text-truncate"
            >
              {contact.username}
            </h6>
            <div
              title={contact.messages[contact.messages.length - 1].message}
              className="m-1 small overflow-hidden text-truncate"
            >
              {contact.messages[contact.messages.length - 1].message}
            </div>
          </div>
          <div className="ms-auto">
            <small className="text-muted">
              {contact.messages[contact.messages.length - 1].time}
            </small>
          </div>
          <Badge pill style={{ backgroundClip: "#25d366" }}>
            {notification.length}
          </Badge>
        </div>
      </Button>
    )
  );
}

export default Contact;
