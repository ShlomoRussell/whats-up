import React from "react";
import ChatContainer from "./ChatContainer";
import SidebarContainer from "./SidebarContainer";

function PageContainer() {
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
