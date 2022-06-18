import React from "react";
import { OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { VscCircleLargeOutline } from "react-icons/vsc";
import UserProfilePic from "./UserProfilePic";

function SidebarHeader() {
  return (
    <div className="d-flex justify-content p-2 border-bottom">
      <UserProfilePic />
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
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip-bottom`}>Menu</Tooltip>}
        >
          <span className="m-1">
            <BsThreeDots className="mx-auto mt-2" />
          </span>
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default SidebarHeader;
