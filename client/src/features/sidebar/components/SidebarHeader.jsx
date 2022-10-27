import React, { useRef } from "react";
import { IoAdd } from "react-icons/io5";
import { VscCircleLargeOutline } from "react-icons/vsc";
import UserProfilePic from "./UserProfilePic";
import { useEffect } from "react";
import { useState } from "react";
import UserMenuDropdown from "./UserMenuDropdown";

function SidebarHeader({ searchHeight }) {
  const sidebarHeaderHeightRef = useRef();
  const [sidebarHeaderHeight, setSidebarHeaderHeight] = useState(0);
  useEffect(() => {
    setSidebarHeaderHeight(sidebarHeaderHeightRef.current.offsetHeight);
  });
  return (
    <div
      ref={sidebarHeaderHeightRef}
      className="d-flex justify-content p-2 border-bottom"
    >
      <UserProfilePic
        offcanvasHeaderHeight={searchHeight + sidebarHeaderHeight}
      />
      <div className="ms-auto">
        <span title="Status" className="m-1">
          <VscCircleLargeOutline className="mx-auto mt-2" />
        </span>

        <span title="New chat" className="m-1">
          <IoAdd className="mx-auto mt-2" />
        </span>

        <UserMenuDropdown />
      </div>
    </div>
  );
}

export default SidebarHeader;
