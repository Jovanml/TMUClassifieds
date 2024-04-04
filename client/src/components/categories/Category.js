// Packages
import { useLocation, useNavigate } from 'react-router-dom';

// Styles
import './Category.css';

const Category = ({label, icon, param}) => {

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const onCategoryClick = () => {
    queryParams.set('category', param);
    const newSearch = `?${queryParams.toString()}`;
    navigate({ search : newSearch });
  }

  return (
    <div 
      className={`category-container ${queryParams.get('category') === param ? 'selected-category' : 'selected-category-not'}`}
      onClick={onCategoryClick}
    >
      {icon}
      <div className='category-label'>
        {label}
      </div>
    </div> 
  );
}

export default Category;
