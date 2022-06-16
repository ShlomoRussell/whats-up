import React from "react";
import { Image } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";

function ContactProfilePic({ contactProfilePic }) {
  return (
    <div style={{ width: "2.75rem", height: "2.75rem" }}>
      {contactProfilePic ? (
        <Image
          src={contactProfilePic}
          roundedCircle={true}
          className="mh-100 mw-100"
        />
      ) : (
        <BsPersonCircle
          className="h-75 w-75 my-1 border-0"
          style={{
            backgroundColor: "#bfc2c6",
            color: "white",
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
}

export default ContactProfilePic;
