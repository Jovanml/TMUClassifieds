// Packages
import { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";

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

  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [postInfo, setPostInfo] = useState({});
  const [tempHeader, setTempHeader] = useState(false);


  useEffect(() => {
    function handleOnScroll() {
      const header = document.getElementById('header-bar');
      const listingContainer = document.getElementById('listing-card-container');
      const sticky = header?.offsetTop;

      if (window.scrollY > sticky) {
        header?.classList.add('header-sticky');
        listingContainer?.classList.add('listing-cards-container-sticky');
        setTempHeader(true);
      } else {
        header?.classList.remove('header-sticky');
        listingContainer?.classList.remove('listing-cards-container-sticky');
        setTempHeader(false);
      }
    }
    
    window.addEventListener('scroll', handleOnScroll);
  }, []);

  useEffect(() => {
    const fetchData = async() => {
      try {
        await axios.get(`http://127.0.0.1:5000/get/posts${location.search}`)
          .then(response => {
            if (response.status === 200) {
              setPosts(response.data);
            }
            if (response.status === 204) {
              setPosts([]);
            }
          })
      } catch (err) {
        console.error(err)
      }
    }

    fetchData();
  }, [location.search]);

  const handleOnClick = ({title, price, location, description, imgSrc, owner, id}) => {
    listingModal.onOpen();
    setPostInfo({
      'title': title,
      'price': price,
      'location': location,
      'description': description,
      'imgSrc': imgSrc,
      'owner': owner,
      'id': id
    })
  };

  return (
    <>
      <ListingModal postInfo={postInfo}/>
      <FilterModal />
      <div id='header-bar'>
        <Header showSearch={true}/>
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
      <div id='listing-card-container' className='listing-cards-container'>
        {posts.map((post) => (
          <ListingCard 
            key={post._id}
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
                id: post.ownerID
              })
            }}
          />
        ))}
      </div>
    </>
  );
}

export default Homepage