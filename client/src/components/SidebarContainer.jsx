import React from 'react'


function SidebarContainer() {
  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 w-25 bg-white overflow-auto">
      <div className="list-group border-bottom border-end border-top scrollarea">
        <Contact />
      </div>
    </div>
  );
}

export default SidebarContainer