// Packages
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";

// Hooks
import useListingModal from "../../hooks/useListingModal";
import useFilterModal from "../../hooks/useFilterModal";

// Contexts
import { GlobalContext } from "../../contexts/GlobalContext";

// Components
import Header from "../Header/Header";
import Categories from "../Categories/Categories";
import ListingCard from "../Listings/ListingCard";
import ListingModal from "../Modals/ListingModal";

import FilterModal from "../Modals/FilterModal";
import Button from "../Buttons/Button";

// Icons
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

// Styles
import './Homepage.css';

const Homepage = () => {
  // get the modal stores which store the states of the modal
  const listingModal = useListingModal();
  const filterModal = useFilterModal();

  // get the url query params
  const location = useLocation();

  // store the posts when fetching data
  const [posts, setPosts] = useState([]);
  const [postInfo, setPostInfo] = useState({});

  // user state
  const { state } = useContext(GlobalContext);
  

  useEffect(() => {
    // on scroll function handler for sticky header
    function handleOnScroll() {
      const header = document.getElementById('header-bar');
      const listingContainer = document.getElementById('listing-card-container');
      const sticky = header?.offsetTop;

      if (window.scrollY > sticky) {
        header?.classList.add('header-sticky');
        listingContainer?.classList.add('listing-cards-container-sticky');
      } else {
        header?.classList.remove('header-sticky');
        listingContainer?.classList.remove('listing-cards-container-sticky');
      }
    }
    
    window.addEventListener('scroll', handleOnScroll);
  }, []);

  useEffect(() => {
    // fetch data from backend based on query params
    const fetchData = async() => {
      try {
        await axiosInstance.get(`get/posts${location.search}`)
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

  // store the post data to display in the listing modal
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

  // show the admin dashboard if the user is an admin, otherwise show the homepage after login
  if (state.user.admin === "true") return <Navigate to="/admin-dashboard" />;
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