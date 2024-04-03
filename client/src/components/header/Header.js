// Packages
import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Icons
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/searchIcon.svg';

import { ChatBubbleOvalLeftIcon, PlusCircleIcon, Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// Styles
import './Header.css';


const Header = ({currentUser}) => {

  const mobileBreakpoint = '(max-width: 640px)'
  const isMobile = useMediaQuery(mobileBreakpoint);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const [mobileSearchClicked, setMobileSearchClicked] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const toggleMenuOpen = useCallback(() => {
    setMenuIsOpen(value => !value);
  }, [])

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
          />
        </div>
        <button 
          className='search-btn'
          onClick={() => setSearchParams({...searchParams, 'search': searchInput})}
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
      <Link to={'/'} className='logo'>
        <img src={logo} className='logoIcon w-full h-full' alt='logo'/>
      </Link>
      {!isMobile && (
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
            />
          </div>
          <button 
            className='search-btn'
            onClick={() => setSearchParams({...searchParams, 'search': searchInput})}
          >
            Search
          </button>
        </div>
      )}
      <div className='header-btns'>
        {isMobile && (
          <button 
            className='btn-circle' 
            onClick={() => {
              setMobileSearchClicked(true)
            }}
          >
            <MagnifyingGlassIcon className='w-9 h-9' />
          </button>
        )}
        <button className='btn-circle'>
          <ChatBubbleOvalLeftIcon className='w-9 h-9'/>
        </button>
        <button className='btn-circle'>
          <PlusCircleIcon className='w-9 h-9' />
        </button>
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
              {currentUser ? (
                <Link to={'/logout'}>
                  <div 
                    className='menu-item'
                  >
                    Logout
                  </div>
                </Link>
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
