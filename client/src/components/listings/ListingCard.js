// Styles
import './ListingCard.css';

const ListingCard = ({imgSrc, price, title, location}) => {
  return (
    <div 
      className='card-container mb-2'
      onClick={() => console.log('card clicked')}
    >
      <div className='img-container'>
        <img src={imgSrc} alt='' />
      </div>
      <h3 className='listing-price'>{price}</h3>
      <h4 className='listing-title'>{title}</h4>
      <p className='listing-location'>{location}</p>
    </div>
  );
}

export default ListingCard;
