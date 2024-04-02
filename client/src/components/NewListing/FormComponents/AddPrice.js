import React from 'react';
import { Box, Typography } from '@mui/material';

const AddPrice = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Set your price</Typography>
            <Typography variant='h6'>You can change it anytime.</Typography>
        </Box>
    )
}

export default AddPrice;