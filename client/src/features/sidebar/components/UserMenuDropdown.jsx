import React, { forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logOut } from "../../auth/redux/authSlice";
import ThreeDotMenuIcon from "./ThreeDotMenuIcon";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <span
    title="Menu"
    className="m-1"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <ThreeDotMenuIcon />
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
        <Dropdown.Item eventKey="1">New Group</Dropdown.Item>
        <Dropdown.Item eventKey="2">Starred Messages</Dropdown.Item>
        <Dropdown.Item eventKey="3">Settings</Dropdown.Item>
        <Dropdown.Item eventKey="4" onClick={onLogout}>
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserMenuDropdown;
