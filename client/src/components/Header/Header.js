// Packages
import { useMediaQuery } from '@mui/material';
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Contexts + Hooks
import { GlobalContext } from '../../contexts/GlobalContext';
import { logOut } from '../../services/auth';

// Icons
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/searchIcon.svg';

import { ChatBubbleOvalLeftIcon, PlusCircleIcon, Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// Styles
import './Header.css';

// reusable header component
const Header = ({showSearch, showChat=true, showNew=true, showHomepage=true}) => {
  // grab state of user
  const { state } = useContext(GlobalContext);

  // mobile breakpoint for responsive design
  const mobileBreakpoint = '(max-width: 640px)'
  const isMobile = useMediaQuery(mobileBreakpoint);
  
  // grab query params from url
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // store state of mobile menu
  const [mobileSearchClicked, setMobileSearchClicked] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  
  // store search input
  const [searchInput, setSearchInput] = useState(queryParams.get('search') || '');

  // toggle mobile menu
  const toggleMenuOpen = useCallback(() => {
    setMenuIsOpen(value => !value);
  }, [])

  // set query params when user searches
  const onSearchClick = () => {
    queryParams.set('search', searchInput);
    const newSearch = `?${queryParams.toString()}`;
    navigate({ search : newSearch });
  }

  // add option to press enter to search
  const enterPress = () => {
    let key = window.event.keyCode;
    if (key === 13) {
      onSearchClick();
    }
  }

  useEffect(() => {
    // function to handle window resize
    function handleResize() {
      // update state if window moves to/from mobile view
      if (!window.matchMedia(mobileBreakpoint).matches) {
        setMobileSearchClicked(false);
      }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
  }, [])

  // mobile search page
  const mobileSearch = (
    <>
      <button 
        className='btn-circle'
        onClick={() => {
          setMobileSearchClicked(false)
        }}
      >
        <XMarkIcon className='w-5 h-5' />
      </button>
      <div className='search-bar search-bar-mobile'>
        <img src={searchIcon} alt='search' />
        <div>
          <input 
            className='search-text-input'
            type='text'
            placeholder='Search TMUFinds'
            name='search-input'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={enterPress}
          />
        </div>
        <button 
          className='search-btn'
          onClick={onSearchClick}
        >
          Search
        </button>
      </div>
    </>
  )

  // render the mobile search if the mobile search button is clicked
  if (mobileSearchClicked) {
    return (
      <header className='header-mobile'>
        {mobileSearch}
      </header>
    )
  }


  return (
    <header className='header'>
      {showHomepage ? (
        <Link to={'/'} className='logo'>
          <img src={logo} className='logoIcon w-full h-full' alt='logo'/>
        </Link>
      ) : (
        <Link to={'/admin-dashboard'} className='logo'>
          <img src={logo} className='logoIcon w-full h-full' alt='logo'/>
        </Link>
      )}
      {!isMobile && showSearch && (
        <div className='search-bar'>
          <img src={searchIcon} alt='search' />
          <div>
            <input 
              className='search-text-input'
              type='text'
              placeholder='Search TMUFinds'
              name='search-input'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={enterPress}
            />
          </div>
          <button 
            className='search-btn'
            onClick={onSearchClick}
          >
            Search
          </button>
        </div>
      )}
      <div className='header-btns'>
        {isMobile && showSearch && (
          <button 
            className='btn-circle' 
            onClick={() => {
              setMobileSearchClicked(true)
            }}
          >
            <MagnifyingGlassIcon className='w-9 h-9' />
          </button>
        )}
        {showChat && (
          <button className='btn-circle'>
            <ChatBubbleOvalLeftIcon className='w-9 h-9' onClick={() => navigate('/message')} />
          </button>
        )}
        {showNew && (
          <button className='btn-circle' onClick={() => navigate('/new-listing')}>
            <PlusCircleIcon className='w-9 h-9' />
          </button>
        )}
        <div className='menu'>
          <button 
            className='wide-btn-circle btn-circle'
            onClick={toggleMenuOpen}
          >
            <Bars3Icon className='w-9 h-9' />
            <UserCircleIcon className='w-9 h-9' />
          </button>
          {menuIsOpen && (
            <div className='menu-opened'>
              {state.isLoggedIn ? (
                <button className='menu-item' onClick={logOut}>
                    Logout
                </button>
              ) : (
                <Link to={'/login'}>
                  <div 
                    className='menu-item'
                  >
                    Login
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
