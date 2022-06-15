import React from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Search from "./Search";
import SidebarBody from "./SidebarBody";

function SidebarContainer() {
  const { user } = useAuth()
  
  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 w-25 bg-white ">
      <Search />
      <SidebarBody />
    </div>
  );
}

export default SidebarContainer;
