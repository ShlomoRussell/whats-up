import React, { useRef, useState, useEffect } from "react";
import UserProfilePic from "./UserProfilePic";
import UserMenuDropdown from "./UserMenuDropdown";

function SidebarHeader({ searchHeight }) {
  const sidebarHeaderHeightRef = useRef();
  const [sidebarHeaderHeight, setSidebarHeaderHeight] = useState(0);
  useEffect(() => {
    setSidebarHeaderHeight(sidebarHeaderHeightRef.current.offsetHeight);
  });
  return (
    <div
      ref={sidebarHeaderHeightRef}
      className="d-flex justify-content p-2 border-bottom"
    >
      <UserProfilePic
        offcanvasHeaderHeight={searchHeight + sidebarHeaderHeight}
      />
      <div className="ms-auto">
        <span title="Status" className="m-1">
          {/* unread
          <svg
            className="mt-2"
            style={{ color: "#54656f" }}
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.072,1.761c-3.941-0.104-7.579,2.105-9.303,5.65c-0.236,0.486-0.034,1.07,0.452,1.305 c0.484,0.235,1.067,0.034,1.304-0.45c1.39-2.857,4.321-4.637,7.496-4.553c0.539,0.02,0.992-0.4,1.013-0.939s-0.4-0.992-0.939-1.013 C12.087,1.762,12.079,1.762,12.072,1.761z M1.926,13.64c0.718,3.876,3.635,6.975,7.461,7.925c0.523,0.13,1.053-0.189,1.183-0.712 c0.13-0.523-0.189-1.053-0.712-1.183c-3.083-0.765-5.434-3.262-6.012-6.386c-0.098-0.53-0.608-0.88-1.138-0.782 C2.178,12.6,1.828,13.11,1.926,13.64z M15.655,21.094c3.642-1.508,6.067-5.006,6.201-8.946c0.022-0.539-0.396-0.994-0.935-1.016 c-0.539-0.022-0.994,0.396-1.016,0.935c0,0.005,0,0.009,0,0.014c-0.107,3.175-2.061,5.994-4.997,7.209 c-0.501,0.201-0.743,0.769-0.543,1.27c0.201,0.501,0.769,0.743,1.27,0.543C15.642,21.1,15.648,21.097,15.655,21.094z"
            ></path>
            <path
              fill="#009588"
              d="M19,1.5c1.657,0,3,1.343,3,3s-1.343,3-3,3s-3-1.343-3-3S17.343,1.5,19,1.5z"
            ></path>
          </svg> */}
          <svg
            className="mt-2"
            style={{ color: "#54656f" }}
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,20.664c-2.447,0.006-4.795-0.966-6.521-2.702c-0.381-0.381-0.381-1,0-1.381c0.381-0.381,1-0.381,1.381,0 l0,0c2.742,2.742,7.153,2.849,10.024,0.244c0.4-0.361,1.018-0.33,1.379,0.07c0.36,0.398,0.33,1.013-0.066,1.375 C16.502,19.813,14.292,20.666,12,20.664z M19.965,14.552c-0.539,0-0.977-0.437-0.977-0.976c0-0.085,0.011-0.17,0.033-0.253 c1.009-3.746-1.105-7.623-4.8-8.804c-0.51-0.175-0.782-0.731-0.607-1.241c0.17-0.495,0.7-0.768,1.201-0.619 c4.688,1.498,7.371,6.416,6.092,11.169C20.793,14.255,20.407,14.551,19.965,14.552z M3.94,14.162 c-0.459-0.001-0.856-0.321-0.953-0.769C1.939,8.584,4.858,3.801,9.613,2.533c0.52-0.144,1.058,0.161,1.201,0.681 c0.144,0.52-0.161,1.058-0.681,1.201c-0.005,0.001-0.01,0.003-0.015,0.004C6.37,5.418,4.07,9.187,4.895,12.977 c0.114,0.527-0.221,1.048-0.748,1.162C4.079,14.154,4.01,14.162,3.94,14.162z"
            ></path>
          </svg>
          {/* <VscCircleLargeOutline className="mx-auto mt-2" /> */}
        </span>

        <span title="New chat" className="m-1">
          <svg
            className="mt-2"
            style={{ color: "#54656f" }}
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              enableBackground="new"
              d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"
            ></path>
          </svg>
          {/* <IoAdd className="mx-auto mt-2"  /> */}
        </span>

        <UserMenuDropdown />
      </div>
    </div>
  );
}

export default SidebarHeader;
