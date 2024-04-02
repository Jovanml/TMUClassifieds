import React from 'react';
import { Box, Typography } from '@mui/material';

const AddDescription = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Now, let's describe your item</Typography>
            <Typography variant='h6'>Create your description. Share what makes your item awesome.</Typography>
        </Box>
    )
}

export default AddDescription;