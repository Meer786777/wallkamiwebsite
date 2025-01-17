import React from 'react';
import '../styles/header.css';

function Header({ setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  return (
    <>
      <div className="headerbg">
        <nav>
          <a href="#" className="nav-logo">WallKami.com</a>
        </nav>

        <div className="header-serach-parent">
          <h1 className="H-h1">Anime Art, Black & White Aesthetic — 25K+ Wallpapers to Choose From</h1>
          <div className="serach">
            <input
              type="text"
              className="inp"
              placeholder="Search for free Wallpapers"
              onChange={handleSearchChange}
            />
            {/* <button className="serach-btn">
              <svg className="scg-serach" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="..." fill="white" />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
