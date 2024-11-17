import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiBell, HiSearch } from 'react-icons/hi';
import { User } from 'lucide-react';
import Lottie from 'react-lottie';
import icon from "/assets/image.png"
import animationData from '../../assets/animatedTitle.json'; // Import your Lottie animation

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const [searching, setSearching] = useState(false);
  const [scrolling, setScrolling] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleSearch = async (keyword) => {
    if (!keyword.trim()) return;
    setSearching(true);
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${keyword}&include_adult=true`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    if (data.results.length === 0) {
      setSearching(false);
    } else {
      setSearching(false);
      navigate(`/search?query=${encodeURIComponent(keyword)}`, { state: { keyword, data } });
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const clearSearch = () => {
    setSearchKeyword('');
    setShowSearch(false);
    setSearching(false);
    navigate('/');
  };

  useEffect(() => {
    handleSearch(searchKeyword);
  }, [searchKeyword]);

  return (
    <div>
      <header className={`p-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolling ? 'bg-black-700/90' : 'bg-transparent'}`}>
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img width={100} src={icon} alt="Logo Icon" className="mr-2" /> {/* Adjust margin as needed */}
            <Lottie 
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
              }}
              height={50} // Adjust height as needed
              width={200} // Adjust width as needed
            />
          </NavLink>


          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-white focus:outline-none transition-transform duration-200 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className={`absolute md:relative mt-6  top-16 md:top-10 left-0 w-full md:w-auto md:flex ${isMenuOpen ? 'block' : 'hidden'} bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 p-4 md:p-0">
              {['Home', 'Movies', 'Series'].map((text) => (
                <li key={text}>
                  <NavLink
                    to={`/${text.toLowerCase().replace(' ', '')}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 text-lg font-medium rounded-md transition duration-300 ease-in-out
                       ${isActive ? 'text-white font-bold' : 'text-gray-300'}
                       hover:text-white`
                    }
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className='flex items-center gap-4'>
            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-white hover:text-gray-300 focus:outline-none"
            >
              <HiSearch size={24} />
            </button>

            {/* Search Input */}
            {showSearch && (
              <div className="relative flex items-center" ref={searchRef}>
                <input
                  autoComplete="on"
                  aria-label="Search movies"
                  name="search"
                  id="search"
                  type="text"
                  className="w-full md:w-64 px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                  value={searchKeyword}
                  onChange={handleSearchInputChange}
                />
                {searchKeyword && <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-200 hover:text-gray-50"
                  onClick={clearSearch}
                >
                  &times;
                </button>}
              </div>
            )}

            {/* Notification Icon */}
            <button className="p-2 text-white hover:text-gray-300 focus:outline-none">
              <HiBell size={24} />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="p-2 bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 rounded-full transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 active:scale-95"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <User color='white' size={24} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 w-48 text-white bg-gray-800 rounded-md shadow-lg mt-2 z-50">
                  <ul className="py-2">
                    <li >
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-all duration-150 rounded-md">
                        Profile
                      </button>
                    </li>
                    <li onClick={() => setShowDropdown(false)}>
                      <NavLink
                        className="block px-4 py-2 hover:bg-gray-700 transition-all duration-150 rounded-md"
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li >
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-all duration-150 rounded-md"
                        onClick={() => setShowDropdown(false)}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header> 
      
    </div>
  );
}
