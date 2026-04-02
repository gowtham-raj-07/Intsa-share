// Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ home, profile }) => {
  const Navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const onLogout = () => {
    Cookies.remove("jwt_token");
    Navigate("/login", { replace: true });
  };

  const onchange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      Navigate(`/searchpage?query=${searchInput.trim()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='header-container'>
      <div><h1 className='header-title' onClick={() => Navigate('/')}>InstaShare</h1></div>
      <div className='right-part'>
        <input 
          type="search" 
          placeholder='Search Caption' 
          className='search-input' 
          value={searchInput} 
          onChange={onchange} 
          onKeyDown={handleKeyDown}
        />
        <Link to="/" className={`title ${home ? 'extratitle' : ''}`} >Home</Link>
        <Link to="/profile" className={`title ${profile ? 'extratitle' : ''}`} >Profile</Link>
        <button className='logout-button' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
};

export default Header;
