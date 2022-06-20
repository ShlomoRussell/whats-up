import React, { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";

function ContactProfilePic({ contactProfilePic, width, height }) {
  const [isImg, setIsImg] = useState(false);
  useEffect(() => {
    if (contactProfilePic) {
      setIsImg(true);
    }
  }, [contactProfilePic]);
  return (
    <div className="me-3" style={{ width: width, height: height }}>
      {isImg ? (
        <Image
          onError={() => setIsImg(false)}
          src={"/images/" + contactProfilePic}
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
