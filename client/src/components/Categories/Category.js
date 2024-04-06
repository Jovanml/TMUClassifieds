// Packages
import { useLocation, useNavigate } from 'react-router-dom';

// Styles
import './Category.css';

// reusable category component
const Category = ({label, icon, param}) => {

  // get the query params from url
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // on click function handler
  const onCategoryClick = () => {
    // set category query param when a category is clicked and update the query params
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
