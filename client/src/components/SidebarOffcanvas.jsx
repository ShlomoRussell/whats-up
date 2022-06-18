import React from "react";
import { Offcanvas } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";

function SidebarOffcanvas({ show, toggleOffcanvas }) {
  return (
    <Offcanvas className="w-25" show={show} scroll={true} backdrop={false}>
      <Offcanvas.Header>
        <Offcanvas.Title>
          <span
            className="m-1"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={toggleOffcanvas}
          >
            <FiArrowLeft />
          </span>
          Offcanvas
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SidebarOffcanvas;
