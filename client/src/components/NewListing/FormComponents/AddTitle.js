import React from 'react';
import { Box, Typography } from '@mui/material';

const AddTitle = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Let's give your item a title</Typography>
            <Typography variant='h6'>Hav fun with it - shor titles work best but you can always change it later.</Typography>
        </Box>
    )
}

export default AddTitle;