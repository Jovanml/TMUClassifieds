// Packages
import { Link } from 'react-router-dom'

// Styles
import './Button.css';

const Button = ({
  label, // string
  onClick, // e => void
  btnLink, // LinkElement to
  disabled, // boolean
  icon // icon component
}) => {
  return (
    <>
      {btnLink ? (
        <button
          className='btn-container'
          disabled={disabled}
        >
          <Link 
            to={btnLink} 
          >
              {icon && (
                <div className='btn-icon'>
                  {icon}
                </div>
              )}
              {label}
          </Link>
        </button>
      ) : (
        <button 
          className='btn-container'
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
      )}
    </>
  );
}

export default Button;