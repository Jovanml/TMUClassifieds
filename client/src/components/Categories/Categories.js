
// Components
import Category from './Category';

// Icons 
import { DocumentMagnifyingGlassIcon, ShoppingCartIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

// Styles
import './Categories.css';

export const categories = [
  {
    label: 'Items Wanted',
    icon: <DocumentMagnifyingGlassIcon className='w-6 h-6'/>,
    param: 'items-wanted'
  },
  {
    label: 'Items for Sale',
    icon: <ShoppingCartIcon className='w-6 h-6'/>,
    param: 'items-for-sale'
  },
  {
    label: 'Academic Services',
    icon: <AcademicCapIcon className='w-6 h-6' />,
    param: 'academic-services'
  }
]

const Categories = () => {
  return ( 
    <div className='categories-container'>
      {categories.map((category, index) => (
        <Category 
          key={index}
          label={category.label}
          icon={category.icon}
          param={category.param}
        />
      ))}
    </div>
  );
}

export default Categories;
