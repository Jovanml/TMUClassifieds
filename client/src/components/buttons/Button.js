// Packages
import { Link } from 'react-router-dom'

// Styles
import './Button.css';

const Button = ({
  className,
  label, // string
  onClick, // e => void
  btnLink, // LinkElement to
  disabled, // boolean
  icon // icon component
}) => {
  return (
    <>
      {btnLink ? (
        <Link 
          to={btnLink} 
          className={`btn-with-link ${className ? className : ''}`}
          >
          <button
            className='btn-container'
            disabled={disabled}
          >
            {icon && (
              <div className='btn-icon'>
                {icon}
              </div>
            )}
            {label}
          </button>
        </Link>
      ) : (
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
      )}
    </>
  );
}

export default Button;