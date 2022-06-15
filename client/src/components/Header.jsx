import React, { createRef, useContext, useEffect } from "react";
import { ConversationsContext } from "../context/ConversationsProvider";
import Search from "./Search";

function Header() {
  const { currentContact } = useContext(ConversationsContext);

  return (
    currentContact && (
      <nav className="bg-light d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <div className="container-fluid">
          <h4>{currentContact.name}</h4>
          {/*  <a href="/" className="navbar-brand">
          <img src="what's-up.jpg" alt="company logo" />
        </a>
      <Search />*/}
        </div>
      </nav>
    )
  );
}

export default Header;
