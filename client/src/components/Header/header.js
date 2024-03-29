// Icons
import logo from '../../assets/logo.svg';
import searchIcon from '../../assets/searchIcon.svg';

import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Styles
import './header.css';

// Packages
import { useMediaQuery } from '@mui/material';


const Header = () => {

  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <header className='header'>
        <a href='/' className='logo'>
          <img src={logo} className='logoIcon w-full h-full' alt='logo'/>
        </a>
        {!isMobile && (
          <div className='searchBar'>
            <img className='w-5' src={searchIcon} alt='search' />
            <div className='w-96'>
              <input className='w-full focus-visible: outline-none' name='searchInput' placeholder='Search TMUFinds'/>
            </div>
            <button className='bg-black text-white px-4 py-3 rounded-md'>
              Search
            </button>
          </div>
        )}
        <div className='headerButtons'>
          {isMobile && (
            <button className='buttonCircle'>
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