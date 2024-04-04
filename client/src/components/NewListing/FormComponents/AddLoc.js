import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { setDefaults, fromLatLng, setLocationType } from "react-geocode";
import geocodeDefaults from '../../../utils/geocode'

const AddLoc = ({ loc, setLoc, setIsValueInput }) => {
    const [numChars, setNumChars] = useState(0);
    const MAXCHARS = 30;

    async function showPosition(position) {
        setDefaults(geocodeDefaults)
        setLocationType("ROOFTOP");
        fromLatLng(position.coords.latitude, position.coords.longitude)
            .then(({ results }) => {
                const addressArr = results[0].address_components;
                let city = ''
                addressArr.forEach(comp => {
                    if (comp.types.includes('locality')) {
                        city = comp.long_name
                    }
                })
                setLoc(city)
            })
            .catch(console.error);
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (loc.length === 0){
            setIsValueInput(false);
        } else {
            setIsValueInput(true);
        }

        setNumChars(loc.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loc, setIsValueInput])
    
    const onChange = (e) => {
        if (e.target.value.length > MAXCHARS) return;
        setLoc(e.target.value);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Enter you location here</Typography>
            <Typography variant='h6'>If you block the site from knowing your location please input manually.</Typography>
            <Box mt='20px'>
                <TextField
                    multiline
                    rows={1}
                    sx={{width: '650px'}}
                    onChange={onChange}
                    value={loc}
                />
                <Typography fontSize='0.9rem'>{numChars} / {MAXCHARS}</Typography>
            </Box>

        </Box>
    )
}

export default AddLoc;