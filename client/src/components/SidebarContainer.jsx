import React from "react";
import Contact from "./Contact";
import { v4 as uuidv4 } from "uuid";
import "../styles/scrollbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SidebarContainer() {
  const { user } = useAuth()
  
  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 w-25 bg-white overflow-auto">
      <div className="list-group border-bottom border-end border-top scrollarea">
        <Link
          to={"/"}
          className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
        >
          <h3>{user.username}</h3>
        </Link>
        {user['contacts'].map((c) => (
          <Contact key={uuidv4()} contact={ c}/>
        ))}
      </div>
    </div>
  );
}

export default SidebarContainer;
