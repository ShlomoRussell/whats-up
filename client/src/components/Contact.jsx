import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { ConversationsContext } from "../context/ConversationsProvider";
import ContactProfilePic from "./ContactProfilePic";

function Contact({ contact }) {
  const { currentContact, setCurrentContact } = useContext(
    ConversationsContext
  );
  const [contactProfilePic, setContactProfilePic] = useState();

  const handleClick = (e) => {
    if (!currentContact || currentContact.id !== contact.id) {
      setCurrentContact({ id: contact.id, name: contact.username });
    }
  };

  return (
    contact && (
      <Button
        onClick={handleClick}
        variant="link"
        className="list-group-item list-group-item-action py-3 lh-tight w-100"
      >
        <div className="d-flex w-100 ">
          <ContactProfilePic />
          <div>
            <strong className="m-1">{contact.username}</strong>
            <div className="col-10 m-1 small overflow-hidden">
              {contact.messages[contact.messages.length - 1].message}...
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
