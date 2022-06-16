import React from "react";
import Search from "./Search";
import SidebarBody from "./SidebarBody";
import SidebarHeader from "./SidebarHeader";

function SidebarContainer() {
  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 w-25 bg-white ">
      <SidebarHeader />
      <Search />
      <SidebarBody />
    </div>
  );
}

export default SidebarContainer;
