import React from "react";
import Contact from "./Contact";
import { v4 as uuidv4 } from "uuid";
import "../../../styles/scrollbar.css";
import { useSelector } from "react-redux";
import { selectContacts } from "../../auth/redux/authSlice";

export default function SidebarBody() {
  const contacts = useSelector(selectContacts);
  return (
    <div
      style={{ overflowY: "auto" }}
      className="list-group list-group-flush border-bottom vh-100 border-end border-top "
    >
      {contacts.map((c) => (
        <Contact key={uuidv4()} contact={c} />
      ))}
    </div>
  );
}
