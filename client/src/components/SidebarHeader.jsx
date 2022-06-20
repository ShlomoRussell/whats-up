import React,{ useRef }  from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { VscCircleLargeOutline } from "react-icons/vsc";
import UserProfilePic from "./UserProfilePic";
import { useEffect } from "react";
import { useState } from "react";
import UserMenuDropdown from "./UserMenuDropdown";


function SidebarHeader({searchHeight}) {
  const sidebarHeaderHeightRef = useRef()
  const [sidebarHeaderHeight,setSidebarHeaderHeight]=useState(0)
  useEffect(() => {
    setSidebarHeaderHeight(sidebarHeaderHeightRef.current.offsetHeight)
  })
  return (
    <div
      ref={sidebarHeaderHeightRef}
      className="d-flex justify-content p-2 border-bottom"
    >
      <UserProfilePic
        offcanvasHeaderHeight={
          searchHeight + sidebarHeaderHeight
        }
      />
      <div className="ms-auto">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip-bottom`}>Status</Tooltip>}
        >
          <span className="m-1">
            <VscCircleLargeOutline className="mx-auto mt-2" />
          </span>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip-bottom`}>New chat</Tooltip>}
        >
          <span className="m-1">
            <IoAdd className="mx-auto mt-2" />
          </span>
        </OverlayTrigger>
       <UserMenuDropdown/>
      </div>
    </div>
  );
}

export default SidebarHeader;
