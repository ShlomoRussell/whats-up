import React from 'react'
import { useAuth } from '../../../context/AuthContext';
import Contact from "../../../components/Contact";
import { v4 as uuidv4 } from "uuid";
import "../../../styles/scrollbar.css";

export default function SidebarBody() {
  const { user } = useAuth()
  return (
    <div
      style={{ overflowY: "auto" }}
      className="list-group list-group-flush border-bottom vh-100 border-end border-top "
    >
      {user
        ? user["contacts"].map((c) => <Contact key={uuidv4()} contact={c} />)
        : null}
    </div>
  );
}
