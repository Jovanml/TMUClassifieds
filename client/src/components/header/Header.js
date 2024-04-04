// Packages
import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Icons
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/searchIcon.svg';

import { ChatBubbleOvalLeftIcon, PlusCircleIcon, Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// Styles
import './Header.css';

import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { logOut } from '../../services/auth';

const Header = ({showSearch, showChat=true, showNew=true, showHomepage=true}) => {
  const { state } = useContext(GlobalContext);
  const mobileBreakpoint = '(max-width: 640px)'
  const isMobile = useMediaQuery(mobileBreakpoint);
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [mobileSearchClicked, setMobileSearchClicked] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(queryParams.get('search') || '');

  const toggleMenuOpen = useCallback(() => {
    setMenuIsOpen(value => !value);
  }, [])

  const onSearchClick = () => {
    queryParams.set('search', searchInput);
    const newSearch = `?${queryParams.toString()}`;
    navigate({ search : newSearch });
  }

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
