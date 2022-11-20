import React, { useState } from "react";
import Search from "./Search";
import SidebarBody from "./SidebarBody";
import SidebarHeader from "./SidebarHeader";

function SidebarContainer() {
  const [searchHeight, setSearchHeight] = useState(0);
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 w-25 bg-white ">
      <SidebarHeader
        searchHeight={searchHeight}
        setSearchIsFocused={setSearchIsFocused}
      />
      <Search
        setSearchHeight={setSearchHeight}
        isFocused={searchIsFocused}
        setSearchIsFocused={setSearchIsFocused}
      />
      <SidebarBody />
    </div>
  );
}

export default SidebarContainer;
