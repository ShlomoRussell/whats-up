import React, { useRef, useState, useEffect } from "react";
import UserProfilePic from "./UserProfilePic";
import UserMenuDropdown from "./UserMenuDropdown";
import UnreadStatusIcon from "./UnreadStatusIcon";
import ReadStatusIcon from "./ReadStatusIcon";
import NewChatIcon from "./NewChatIcon";

function SidebarHeader({ searchHeight, setSearchIsFocused }) {
  const sidebarHeaderHeightRef = useRef();
  const [sidebarHeaderHeight, setSidebarHeaderHeight] = useState(0);
  const [isRead, setIsRead] = useState(true);
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
          {isRead ? <ReadStatusIcon /> : <UnreadStatusIcon />}
        </span>

        <span
          title="New chat"
          className="m-1"
          onClick={() => setSearchIsFocused(true)}
        >
          <NewChatIcon />
        </span>

        <UserMenuDropdown />
      </div>
    </div>
  );
}

export default SidebarHeader;
