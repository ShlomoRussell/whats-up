import React,{useContext} from 'react'
import { Button } from 'react-bootstrap';

import { ConversationsContext } from "../context/ConversationsProvider";


function Contact({ contact }) {
  const {  setCurrentContactId }=useContext(ConversationsContext)
  const handleClick = (e) => {
    setCurrentContactId(contact.id)
  }
 
  return (
    <Button
      onClick={handleClick}
      variant="link"
      className="list-group-item list-group-item-action py-3 lh-tight"
    >
      <div className="d-flex w-100 align-items-center justify-content-between">
        <strong className="mb-1">{contact.username}</strong>
        <small className="text-muted">
          {contact.messages[contact.messages.length - 1].time}
        </small>
      </div>
      <div className="col-10 mb-1 small">
        {contact.messages[contact.messages.length - 1].message}...
      </div>
    </Button>
  );
}

export default Contact