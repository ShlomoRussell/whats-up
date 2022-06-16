import React from "react";
import { OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { BsPersonCircle, BsThreeDots } from "react-icons/bs";
import { VscCircleLargeOutline } from "react-icons/vsc";
import { useState } from "react";
function SidebarHeader() {
  const [profilePic, setProfilePic] = useState();
  return (
    <div className="d-flex justify-content p-2 border-bottom">
      <div style={{ height: "2.75rem", width: "2.75rem" }}>
        {profilePic ? (
          <Image
            src={profilePic}
            roundedCircle={true}
            className="mh-100 mw-100"
          />
        ) : (
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id={`tooltip-bottom`}>Add profile pic</Tooltip>}
          >
            <span className="m-1">
              <BsPersonCircle
                className="h-75 w-75 my-1 border-0"
                style={{
                  backgroundColor: "#bfc2c6",
                  color: "white",
                  borderRadius: "50%",
                }}
              />
            </span>
          </OverlayTrigger>
        )}
      </div>
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
