import React, { useContext, useRef, useEffect } from "react";
import ContactProfilePic from "./ContactProfilePic";
import { ConversationsContext } from "../context/ConversationsProvider";

function ChatHeader({ setChatHeaderHeight }) {
  const { currentContact } = useContext(ConversationsContext);
  const headerHeightRef = useRef();
  useEffect(() => {
    if (currentContact) {
      setChatHeaderHeight(headerHeightRef.current.offsetHeight);
    }
  }, [currentContact]);
  return (
    currentContact && (
      <nav ref={headerHeightRef} className="bg-light d-flex align-items-center flex-shrink-0 p-2 link-dark text-decoration-none border-bottom position-fixed top-0 end-0 w-75">
        <div style={{ height: "2.75rem" }} className="d-flex w-100">
          <ContactProfilePic />
          <h5 className="my-2">{currentContact.name}</h5>
          <img
            src="what's-up.jpg"
            className="navbar-brand my-2 ms-auto"
            alt="company logo"
          />
        </div>
      </nav>
    )
  );
}

export default ChatHeader;
