import React from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SidebarBody from "./SidebarBody";

function SidebarContainer() {
  const { user } = useAuth()
  
  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 w-25 bg-white ">
      <Link
        to={"/"}
        className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
      >
        <h3>{user ? user.username : null}</h3>
      </Link>
     <SidebarBody />
    </div>
  );
}

export default SidebarContainer;
