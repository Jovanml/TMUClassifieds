// Hooks
import useListingModal from "../../hooks/useListingModal";

// Components
import Modal from "./Modal";
import Heading from "./Heading/Heading";

// Icons 
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

// Styles 
import './ListingModal.css'

// reusable component for the modal of the listings
const ListingModal = ({postInfo}) => {
  // store the listing modal states
  const listingModal = useListingModal();

  // body content of the listing modal
  const bodyContent = (
    <div className='body-container'>
      <div className='body-img-container'>
        <img src={postInfo.imgSrc} alt=''/> 
      </div>
      <div className='body-info-container'>
        <Heading 
          title={postInfo.title}
          subheading={postInfo.location}
          subtitle={postInfo.price}
        />
        <div className='body-description-container'>
          <div className='body-description'>
            {postInfo.description}
          </div>
          <div className='body-seller-info'>
            <div className='body-heading'>Seller Information</div>
            {postInfo.owner}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal 
      isOpen={listingModal.isOpen}
      actionLabel={'Message'}
      actionLink={'/message?messageUser=' + postInfo.id + '&messageUsername=' + postInfo.owner} // TODO - make this align with the message page route
      onClose={listingModal.onClose}
      onSubmit={listingModal.onClose}
      body={bodyContent}
      btnIcon={<ChatBubbleOvalLeftIcon className='w-6 h-6' />}
    />
  );
}

export default ListingModal;