import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import book from './book.png';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className={`bg-gray-800 text-white flex justify-between items-center px-4 py-2 ${activeLink === 'home' ? 'bg-gray-900' : ''}`}>
      <div className="flex items-center">
        <img src={book} alt="Book Logo" className="h-6 w-6 mr-2" />
        <Link
          to="/"
          onClick={() => handleSetActiveLink('home')}
          className={`text-white rounded-md px-3 py-2 text-sm font-medium ${activeLink === 'home' ? 'bg-gray-900' : ''}`}
          aria-current={activeLink === 'home' ? 'page' : undefined}
        >
          Home
        </Link>
      </div>
      <Link
        to="/bookmarks"
        onClick={() => handleSetActiveLink('bookmarks')}
        className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${activeLink === 'bookmarks' ? 'bg-gray-900' : ''}`}
      >
        BookMark
      </Link>
    </div>
  );
};

export default Navbar;
