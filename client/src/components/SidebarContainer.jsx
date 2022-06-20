import React from "react";
import { useState } from "react";
import Search from "./Search";
import SidebarBody from "./SidebarBody";
import SidebarHeader from "./SidebarHeader";

function SidebarContainer() {
  const [searchHeight,setSearchHeight]=useState(0)
  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 w-25 bg-white ">
      <SidebarHeader searchHeight={ searchHeight} />
      <Search setSearchHeight={setSearchHeight}/>
      <SidebarBody />
    </div>
  );
}

export default SidebarContainer;
