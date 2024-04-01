// Packages
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

// Icons
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/searchIcon.svg';

import { ChatBubbleOvalLeftIcon, PlusCircleIcon, Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// Styles
import './Header.css';


const Header = () => {

  const mobileBreakpoint = '(max-width: 640px)'

  const isMobile = useMediaQuery(mobileBreakpoint);
  const [mobileSearchClicked, setMobileSearchClicked] = useState(false);

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
          <input className='search-text-input' name='search-input' placeholder='Search TMUFinds' />
        </div>
        <button className='search-btn'>
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
      <a href='/' className='logo'>
        <img src={logo} className='logoIcon w-full h-full' alt='logo'/>
      </a>
      {!isMobile && (
        <div className='search-bar'>
          <img src={searchIcon} alt='search' />
          <div>
            <input className='search-text-input' name='search-input' placeholder='Search TMUFinds'/>
          </div>
          <button className='search-btn'>
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
        <button className='px-3 py-2 flex justify-center items-center gap-1 border border-gray-300 rounded-full shadow-md shadow-gray-300'>
          <Bars3Icon className='w-9 h-9' />
          <UserCircleIcon className='w-9 h-9' />
        </button>
      </div>
    </header>
  );
}

export default Header;
