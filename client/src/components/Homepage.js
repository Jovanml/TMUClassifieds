// Packages
// import { useEffect } from "react";

// Components
import Header from "./header/Header";
import Categories from "./categories/Categories";
import ListingCard from "./listings/ListingCard";

// Styles
import './Homepage.css';

import tempPhoto from '../assets/tempPhoto.jpg'


const Homepage = () => {
  // const [places, setPlaces] = useState([]);

  // TODO - axios call
  // useEffect(() => {}, []);

  return (
    <>
      <Header />
      <Categories />
      <div className='listing-cards-container'>
        <ListingCard 
          imgSrc={tempPhoto}
          price={'$10'}
          title={'HB Classic Black Wooden Pencil with Eraser - Pack of 12'}
          location={'Toronto, ON'}
        />
        <ListingCard 
          imgSrc={tempPhoto}
          price={'$10'}
          title={'HB Classic Black Wooden Pencil with Eraser - Pack of 12'}
          location={'Toronto, ON'}
        />
        <ListingCard 
          imgSrc={tempPhoto}
          price={'$10'}
          title={'HB Classic Black Wooden Pencil with Eraser - Pack of 12'}
          location={'Toronto, ON'}
        />
        <ListingCard 
          imgSrc={tempPhoto}
          price={'$10'}
          title={'HB Classic Black Wooden Pencil with Eraser - Pack of 12'}
          location={'Toronto, ON'}
        />
        <ListingCard 
          imgSrc={tempPhoto}
          price={'$10'}
          title={'HB Classic Black Wooden Pencil with Eraser - Pack of 12'}
          location={'Toronto, ON'}
        />
        <ListingCard 
          imgSrc={tempPhoto}
          price={'$10'}
          title={'HB Classic Black Wooden Pencil with Eraser - Pack of 12'}
          location={'Toronto, ON'}
        />
      </div>
    </>
  );
}

export default Homepage