
// Components
import Category from './Category';

// Icons 
import { DocumentMagnifyingGlassIcon, ShoppingCartIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

// Styles
import './Categories.css';

export const categories = [
  {
    label: 'Items Wanted',
    icon: <DocumentMagnifyingGlassIcon className='w-6 h-6'/>
  },
  {
    label: 'Items for Sale',
    icon: <ShoppingCartIcon className='w-6 h-6'/>
  },
  {
    label: 'Academic Services',
    icon: <AcademicCapIcon className='w-6 h-6' />
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
        />
      ))}
    </div>
  );
}

export default Categories;