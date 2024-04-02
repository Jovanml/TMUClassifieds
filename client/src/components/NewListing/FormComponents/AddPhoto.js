import React from 'react';
import { Box, Typography } from '@mui/material';

const AddPhoto = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Add some photos of your item</Typography>
            <Typography variant='h6'>You can add more or make changes later.</Typography>
        </Box>
    )
}

export default AddPhoto;