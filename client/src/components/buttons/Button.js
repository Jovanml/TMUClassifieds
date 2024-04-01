// Styles
import './Button.css';

const Button = ({
  label, // string
  onClick, // e => void
  disabled, // boolean
  icon // icon component
}) => {
  return (
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
  );
}

export default Button;