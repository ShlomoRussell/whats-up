import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ContactProfilePic from "./ContactProfilePic";
import { selectCurrentChat } from "../redux/chatSlice";

function ChatHeader({ setChatHeaderHeight }) {
  const currentContact = useSelector(selectCurrentChat);
  const headerHeightRef = useRef();
  useEffect(() => {
    if (currentContact) {
      setChatHeaderHeight(headerHeightRef.current.offsetHeight);
    }
  }, [currentContact]);
  return (
    currentContact && (
      <nav
        ref={headerHeightRef}
        className="bg-light d-flex align-items-center flex-shrink-0 p-2 link-dark text-decoration-none border-bottom position-fixed top-0 end-0 w-75"
      >
        <div style={{ height: "2.75rem" }} className="d-flex w-100">
          <ContactProfilePic
            width="2.75rem"
            height="2.75rem"
            contactProfilePic={currentContact.image}
          />
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
