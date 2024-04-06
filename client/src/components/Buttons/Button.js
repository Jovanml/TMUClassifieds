// Styles
import './Button.css';

// reusable button component
const Button = ({
  className, // string
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