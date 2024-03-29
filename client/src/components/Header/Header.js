// Packages
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

// Icons
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/searchIcon.svg';

import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
        className='buttonCircle'
        onClick={() => {
          setMobileSearchClicked(false)
        }}
      >
        <XMarkIcon className='w-5 h-5' />
      </button>
      <div className='searchBar mobileSearchBar'>
        <img src={searchIcon} alt='search' />
        <div>
          <input className='searchTextBar' name='searchInput' placeholder='Search TMUFinds' />
        </div>
        <button className='searchButton'>
          Search
        </button>
      </div>
    </>
  )

  if (mobileSearchClicked) {
    return (
      <header className='headerMobile'>
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
        <div className='searchBar'>
          <img src={searchIcon} alt='search' />
          <div>
            <input className='searchTextBar' name='searchInput' placeholder='Search TMUFinds'/>
          </div>
          <button className='searchButton'>
            Search
          </button>
        </div>
      )}
      <div className='headerButtons'>
        {isMobile && (
          <button 
            className='buttonCircle' 
            onClick={() => {
              setMobileSearchClicked(true)
            }}
          >
            <MagnifyingGlassIcon className='w-9 h-9' />
          </button>
        )}
        <button className='buttonCircle'>
          <ChatBubbleOvalLeftIcon className='w-9 h-9'/>
        </button>
        <button className='buttonCircle'>
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
