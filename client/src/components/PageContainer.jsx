import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../features/auth/redux/authSlice";
import ChatContainer from "../features/chat/components/ChatContainer";
import SidebarContainer from "../features/sidebar/components/SidebarContainer";
import { useConnectSocketQuery } from "../socket/socketApiSlice";

function PageContainer() {
  const id = useSelector(selectCurrentUserId);
  useConnectSocketQuery(id);
  return (
    <div className="vh-100 vw-100 overflow-hidden">
      <div className="d-flex flex-nowrap">
        <SidebarContainer />
        <ChatContainer />
      </div>
    </div>
  );
}

export default PageContainer;
