// Packages
import { useEffect, useState } from "react";
import axios from 'axios';

// Hooks
import useListingModal from "../hooks/useListingModal";
import useFilterModal from "../hooks/useFilterModal";

// Components
import Header from "./header/Header";
import Categories from "./categories/Categories";
import ListingCard from "./listings/ListingCard";
import ListingModal from "./modals/ListingModal";
import Button from "./buttons/Button";
import FilterModal from "./modals/FilterModal";

// Icons
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

// Styles
import './Homepage.css';




const Homepage = () => {
  const listingModal = useListingModal();
  const filterModal = useFilterModal();

  const [posts, setPosts] = useState([]);
  const [postInfo, setPostInfo] = useState({});


  // add location.search to dependency array
  // no data -> if returns 204 set posts to empty array
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

    function handleOnScroll() {
      const header = document.getElementById('header-bar');
      console.log(header.offsetTop);
      const sticky = header.offsetTop;

      if (window.scrollY > sticky) {
        header.classList.add('header-sticky');
      } else {
        header.classList.remove('header-sticky');
      }
    }

    window.addEventListener('scroll', handleOnScroll);
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
      <FilterModal />
      <div id='header-bar'>
        <Header />
        <div className='params-container'>
          <Categories />
          <div className='filter-btn-container'>
            <Button 
              label={'Filters'}
              icon={<AdjustmentsHorizontalIcon className='w-6 h-6 ' />}
              onClick={filterModal.onOpen}
            />
          </div>
        </div>
      </div>
      <div className='listing-cards-container'>
        {posts.map((post) => (
          <ListingCard 
            imgSrc={post.picture}
            price={`$${post.price}`}
            title={post.title}
            location={post.location}
            onClick={() => {
              handleOnClick({
                title: post.title, 
                price: `$${post.price}`, 
                location: post.location, 
                description: post.description, 
                imgSrc: post.picture, 
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