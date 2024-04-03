import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const AddTitle = () => {
    const [title, setTitle] = useState('');
    const [numChars, setNumChars] = useState(0);
    const MAXCHARS = 36;

    useEffect(() => {
        setNumChars(title.length);
    }, [title])
    
    const onChange = (e) => {
        if (e.target.value.length > MAXCHARS) return;
        setTitle(e.target.value);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Let's give your item a title</Typography>
            <Typography variant='h6'>Have fun with it - shor titles work best but you can always change it later.</Typography>
            <Box mt='20px'>
                <TextField
                    multiline
                    rows={5}
                    sx={{width: '650px'}}
                    onChange={onChange}
                    value={title}
                />
                <Typography fontSize='0.9rem'>{numChars} / {MAXCHARS}</Typography>
            </Box>

        </Box>
    )
}

export default AddTitle;