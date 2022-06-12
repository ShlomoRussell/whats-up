import React, { useState } from 'react'
import ChatContainer from './ChatContainer';
import Header from './Header';
import SidebarContainer from './SidebarContainer';

function PageContainer() {
  const [headerHeight,setHeaderHeight]=useState()
  return (
    <div className="vh-100 vw-100 overflow-hidden">
      <Header setHeaderHeight={setHeaderHeight} />
      <div className="d-flex flex-nowrap">
        <SidebarContainer />
        <ChatContainer headerHeight={headerHeight} />
      </div>
    </div>
  );
}

export default PageContainer