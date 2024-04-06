//Hooks
import React, { useEffect, useState } from 'react';

//HTML Components
import { Box, Typography, TextField } from '@mui/material';

const AddTitle = ({ title, setTitle, setIsValueInput }) => {

    //current number of characters in input
    const [numChars, setNumChars] = useState(0);

    //max number of characters in input
    const MAXCHARS = 36;

    //check if input valid whenver it is updated
    useEffect(() => {
        if (title.length === 0){
            setIsValueInput(false);
        } else {
            setIsValueInput(true);
        }

        setNumChars(title.length);
    }, [title, setIsValueInput])

    //handle user updating input
    const onChange = (e) => {
        if (e.target.value.length > MAXCHARS) return;
        setTitle(e.target.value);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Let's give your item a title</Typography>
            <Typography variant='h6'>Have fun with it - short titles work best but you can always change it later.</Typography>
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