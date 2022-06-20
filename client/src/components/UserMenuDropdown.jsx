import { Dropdown } from "react-bootstrap";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    title="Menu"
    className="m-1"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <BsThreeDots className="mx-auto mt-2" />
  </span>
));

function UserMenuDropdown() {
  const { signout } = useAuth();
  return (
    <Dropdown className="d-inline" autoClose="outside">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu align="start">
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3">Orange</Dropdown.Item>
        <Dropdown.Item eventKey="1" onClick={signout}>
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenuDropdown;
