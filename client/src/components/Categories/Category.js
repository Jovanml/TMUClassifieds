// Styles
import './Category.css';

const Category = ({label, icon, selected}) => {

  // TODO - add logic to add category as a URL param when selected

  return (
    <div className={`category-container ${selected ? 'selected-category' : 'selected-category-not'}`}>
      {icon}
      <div className='category-label'>
        {label}
      </div>
    </div> 
  );
}

export default Category;