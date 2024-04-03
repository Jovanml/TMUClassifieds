import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const AddDescription = () => {
    const [description, setDescription] = useState('');
    const [numChars, setNumChars] = useState(0);
    const MAXCHARS = 500;

    useEffect(() => {
        setNumChars(description.length);
    }, [description])
    
    const handleOnChange =(e) => {
        if (e.target.value.length > MAXCHARS) return;
        setDescription(e.target.value);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Now, let's describe your item</Typography>
            <Typography variant='h6'>Create your description. Share what makes your item awesome.</Typography>
            <Box mt='20px'>
                <TextField
                    multiline
                    rows={10}
                    sx={{width: '650px'}}
                    onChange={handleOnChange}
                    value={description}
                />
                <Typography fontSize='0.9rem'>{numChars} / {MAXCHARS}</Typography>
            </Box>
        </Box>
    )
}

export default AddDescription;