// Styles
import './Heading.css';

// reusable heading component for the modals
const Heading = ({
  title, // string
  subtitle, // string
  subheading, // string
  center // boolean
}) => {
  return (
    <div className={center ? 'heading-text-center' : 'heading-text-start'}>
      <div className='heading-title'>
        {title}
      </div>
      <div className='heading-subheading'>
        {subheading}
      </div>
      <div className='heading-subtitle'>
        {subtitle}
      </div>
    </div>
  );
}

export default Heading;