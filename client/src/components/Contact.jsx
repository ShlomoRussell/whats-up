import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ConversationsContext } from "../context/ConversationsProvider";
import ContactProfilePic from "./ContactProfilePic";

function Contact({ contact }) {
  const { currentContact, setCurrentContact } = useContext(
    ConversationsContext
  );

  const handleClick = (e) => {
    if (!currentContact || currentContact.id !== contact.id) {
      setCurrentContact({ id: contact.id, name: contact.username, image: contact.image });
    }
  };

  return (
    contact && (
      <Button
        onClick={handleClick}
        variant="link"
        className="list-group-item list-group-item-action py-3 lh-tight w-100"
      >
        <div className="d-flex  w-100">
          <ContactProfilePic
            height="40%"
            width="20%"
            contactProfilePic={contact.image}
          />
          <div style={{ minWidth: 0, flexShrink: 15 }} title={contact.username}>
            <h6 className="m-1 overflow-hidden text-truncate">
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
        </div>
      </Button>
    )
  );
}

export default Contact;
