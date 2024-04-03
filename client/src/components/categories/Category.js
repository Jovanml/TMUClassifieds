// Packages
import { useSearchParams } from 'react-router-dom';

// Styles
import './Category.css';

const Category = ({label, icon, selected}) => {

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div 
      className={`category-container ${selected ? 'selected-category' : 'selected-category-not'}`}
      onClick={() => setSearchParams({...searchParams, 'category': label})}
    >
      {icon}
      <div className='category-label'>
        {label}
      </div>
    </div> 
  );
}

export default Category;
