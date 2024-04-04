// Packages 
import { useState } from "react";

// Hooks
import { useLocation, useNavigate } from "react-router-dom";
import useFilterModal from "../../hooks/useFilterModal";

// Components
import Modal from "./Modal";
import Slider from '@mui/material/Slider';

// Icons
import { MapPinIcon } from "@heroicons/react/24/outline";

// Styles
import './FilterModal.css';

const FilterModal = () => {
  const filterModal = useFilterModal();

  const urlLocation = useLocation();
  const navigate = useNavigate();
  let queryParams = new URLSearchParams(urlLocation.search);
  

  const [location, setLocation] = useState('');
  const [priceMore, setPriceMore] = useState(0);
  const [priceLess, setPriceLess] = useState(10000);
  const [priceValue, setPriceValue] = useState([priceMore, priceLess])


  const handleOnChange = (e, newValue) => {
    setPriceValue(newValue);
    setPriceMore(newValue[0]);
    setPriceLess(newValue[1]);
  }

  const onSubmit = () => {
    if (location !== '') queryParams.set('location', location);
    queryParams.set('priceMore', priceMore);
    queryParams.set('priceLess', priceLess);
    const newSearch = `?${queryParams.toString()}`;
    navigate({ search : newSearch });
    filterModal.onClose();
  }

  const onClearAll = () => {
    setLocation('');
    setPriceMore(0);
    setPriceLess(10000);
    setPriceValue([priceMore, priceLess])
  }
  

  const bodyContent = (
    <div className='filter-body-container'>
      <div className='filter-body-location-container'>
        <div className='filter-body-text-container'>
          <h1 className='filter-body-heading'>Location</h1>
          <p className='filter-body-subheading'>Search for postings near your location</p>
        </div>
        <div className='filter-location-input-container'>
          <MapPinIcon className='w-6 h-6' />
          <input
            className='filter-location-text-input'
            type='text'
            placeholder='Search location'
            name='location-input'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className='filter-body-price-container'>
        <div className='filter-body-text-container'>
          <h1 className='filter-body-heading'>Price range</h1>
          <p className='filter-body-subheading'>Filter postings based on price</p>
        </div>
        <div className='filter-price-container'>
          <div className='filter-price-slider'>
            <Slider 
              value={priceValue}
              onChange={handleOnChange}
              max={10000}
              valueLabelDisplay='auto'
              disableSwap
              sx={{
                color: '#000',
                height: 8,
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-thumb': {
                  height: 24,
                  width: 24,
                  backgroundColor: '#fff',
                  border: '2px solid currentColor',
                  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: 'inherit',
                  },
                  '&::before': {
                    display: 'none',
                  },
                },
                '& .MuiSlider-valueLabel': {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: 'unset',
                  padding: 0,
                  width: 32,
                  height: 32,
                  borderRadius: '50% 50% 50% 0',
                  backgroundColor: '#000',
                  transformOrigin: 'bottom left',
                  transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                  '&::before': { display: 'none' },
                  '&.MuiSlider-valueLabelOpen': {
                    transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                  },
                  '& > *': {
                    transform: 'rotate(45deg)',
                  },
                },
              }}
            />
            <div className='filter-price-input-container'>
              <div className='filter-price-input'>
                <input
                  className='price-input'
                  type='text'
                  placeholder={`${priceMore}`}
                  name='price-more-input'
                  value={priceMore}
                  onChange={(e) => {
                    setPriceMore(e.target.value);
                    setPriceValue([e.target.value, priceValue[1]])
                  }}
                />
              </div>
              <div className='filter-price-input'>
                <input
                  className='price-input'
                  type='text'
                  placeholder={`${priceLess}`}
                  name='price-less-input'
                  value={priceLess}
                  onChange={(e) => {
                    setPriceLess(e.target.value);
                    setPriceValue([priceValue[0], e.target.value])
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={filterModal.isOpen}
      onClose={filterModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel={'Show'}
      secondaryAction={onClearAll}
      secondaryActionLabel={'Clear All'}
      body={bodyContent}
    />
  );
}

export default FilterModal;