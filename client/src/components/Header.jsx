import React from 'react'
import Search from './Search';

function Header() {
  return (
    <nav className="navbar bg-light">
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