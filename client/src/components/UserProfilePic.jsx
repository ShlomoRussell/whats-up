import React from "react";
import { useState } from "react";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { BsPersonCircle } from "react-icons/bs";
import Offcanvas from "./SidebarOffcanvas";

function UserProfilePic() {
  const { user } = useAuth();
  const [isImg, setIsImg] = useState(true);
  const [show, setShow] = useState(false);
  const toggleOffcanvas = () => {
    setShow(!show);
  }
 
  return (
    <div
      onClick={toggleOffcanvas}
      style={{ height: "2.75rem", width: "2.75rem" }}
    >
      {user && isImg ? (
        <Image
          src={"/images/" + user.image}
          onError={() => setIsImg(false)}
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
      <Offcanvas show={show} toggleOffcanvas={toggleOffcanvas} />
    </div>
  );
}

export default UserProfilePic;
