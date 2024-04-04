// Packages
import { Link } from 'react-router-dom'

// Styles
import './Button.css';

const Button = ({
  className,
  label, // string
  onClick, // e => void
  disabled, // boolean
  icon // icon component
}) => {
  return (
    <button 
      className={`btn-container ${className ? className : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && (
        <div className='btn-icon'>
          {icon}
        </div>
      )}
      {label}
    </button>
  );
}

export default Button;