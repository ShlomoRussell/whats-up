import React, { createRef, useEffect } from 'react'
import Search from './Search';

function Header({ setHeaderHeight }) {
  const headerHeightRef = createRef();
  useEffect(() => {
    setHeaderHeight(headerHeightRef.current.offsetHeight);
  }, []);
  return (
    <nav ref={headerHeightRef} className="navbar bg-light">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
          <img src="what's-up.jpg" alt="company logo" />
        </a>
        <Search />
      </div>
    </nav>
  );
}

export default Header