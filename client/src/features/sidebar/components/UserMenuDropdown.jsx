import React, { forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { logOut } from "../../auth/redux/authSlice";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
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
  const dispatch = useDispatch();
  const onLogout = () => dispatch(logOut());
  return (
    <Dropdown className="d-inline" autoClose="outside">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Custom toggle
      </Dropdown.Toggle>

      <Dropdown.Menu align="start">
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3">Orange</Dropdown.Item>
        <Dropdown.Item eventKey="4" onClick={onLogout}>
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenuDropdown;
