// Header.jsx
import React from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ searchTerm, setSearchTerm, home, profile }) => {
  const Navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    Navigate("/login", { replace: true });
  };

  const onchange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='header-container'>
      <div><h1 className='header-title'>InstaShare</h1></div>
      <div className='right-part'>
        <input 
          type="search" 
          placeholder='Search Caption' 
          className='search-input' 
          value={searchTerm} 
          onChange={onchange} 
        />
        <Link to="/" className={`title ${home ? 'extratitle' : ''}`} >Home</Link>
        <Link to="/profile" className={`title ${profile ? 'extratitle' : ''}`} >Profile</Link>
        <button className='logout-button' onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
};

export default Header;
