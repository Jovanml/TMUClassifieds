import logo from '../assets/logo.svg';
import searchIcon from '../assets/searchIcon.svg';
import menuIcon from '../assets/menuIcon.svg';
import avatarIcon from '../assets/avatarIcon.svg';
import chatIcon from '../assets/chatIcon.svg';
import newPostingIcon from '../assets/newPostingIcon.svg';


const Header = () => {
  return (
    <header className='p-8 flex justify-between items-center'>
        <a href='/' className='flex items-center'>
          <img src={logo} className='logo w-3/4' alt='logo'/>
        </a>
        <div className='p-4 flex justify-center items-center gap-2 border border-gray-300 rounded-2xl shadow-md shadow-gray-300'>
          <img className='w-5' src={searchIcon} alt='search' />
          <div className='w-96'>
            <input className='w-full focus-visible: outline-none' name='searchInput' placeholder='Search TMUFinds'/>
          </div>
          <button className='bg-black text-white px-4 py-3 rounded-md'>
            Search
          </button>
        </div>
        <div className='flex justify-center items-center gap-5'>
          <button className='p-2 flex justify-center items-center border border-gray-300 rounded-full shadow-md shadow-gray-300'>
            <img src={chatIcon} className='chat w-8' alt='chat' />
          </button>
          <button className='p-2 flex justify-center items-center border border-gray-300 rounded-full shadow-md shadow-gray-300'>
            <img src={newPostingIcon} className='newPosting w-8' alt='new post' />
          </button>
          <button className='px-3 py-2 flex justify-center items-center gap-1 border border-gray-300 rounded-full shadow-md shadow-gray-300'>
            <img src={menuIcon} className='menu w-8' alt='menu' />
            <img src={avatarIcon} className='avatar w-8' alt='avatar' />
          </button>
        </div>
      </header>
  );
}

export default Header;