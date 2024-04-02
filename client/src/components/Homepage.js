// Packages
import { useEffect, useState } from "react";
import axios from 'axios';

// Components
import Header from "./header/Header";
import Categories from "./categories/Categories";
import ListingCard from "./listings/ListingCard";
import ListingModal from "./modals/ListingModal";

// Hooks
import useListingModal from "../hooks/useListingModal";

// Styles
import './Homepage.css';

import tempPhoto from '../assets/tempPhoto.jpg'
import Modal from "./modals/Modal";




const Homepage = () => {
  const listingModal = useListingModal();
  const [posts, setPosts] = useState([]);
  const [postInfo, setPostInfo] = useState({});

  // TODO - axios call
  useEffect(() => {
    const fetchData = async() => {
      try {
        await axios.get('http://127.0.0.1:5000/get/posts?limit=10&offset=0')
          .then(response => response.data)
          .then(data =>{
              setPosts(data);
              console.log(data);
          })
      } catch (err) {
        console.error(err)
      }
    }

    fetchData();
  }, []);

  const handleOnClick = ({title, price, location, description, imgSrc, owner}) => {
    listingModal.onOpen();
    setPostInfo({
      'title': title,
      'price': price,
      'location': location,
      'description': description,
      'imgSrc': imgSrc,
      'owner': owner,
    })
  };

  return (
    <>
      <ListingModal postInfo={postInfo}/>
      <Header />
      <Categories />
      <div className='listing-cards-container'>
        {posts.map((post) => (
          <ListingCard 
            imgSrc={`data:${post.picture.type};base64,${post.picture.data}`}
            price={`$${post.price}`}
            title={post.title}
            location={post.location}
            onClick={() => {
              handleOnClick({
                title: post.title, 
                price: `$${post.price}`, 
                location: post.location, 
                description: post.description, 
                imgSrc: `data:${post.picture.type};base64,${post.picture.data}`, 
                owner: post.owner,
              })
            }}
          />
        ))}
      </div>
    </>
  );
}

export default Homepage