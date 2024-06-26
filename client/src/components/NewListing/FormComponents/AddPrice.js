import React from 'react';

//HTML Components
import { Box, Typography, Button, TextField } from '@mui/material';

const AddPrice = ({ price, setPrice }) => {

    //use regex to check if input is valid
    function isValidInput(str) {
        return /^([0](\.|\.\d{1,2})?|[1-9]\d*(\.|\.\d{1,2})?)$/.test(str);
    }

    //handles change of input
    const handleOnChange = (e) => {
        if (isValidInput(e.target.value) || e.target.value === ''){
            setPrice(e.target.value);
        }
    }

    //handles increasing the input
    const handleIncrement = (e) => {
        setPrice((price) => {
            if (price === '') return 1;
            return (Number(price) + 1).toFixed(2);
        });
    }

    //handles decreasing the input
    const handleDecrement = (e) => {
        setPrice((price) => {
            if (price === '' || (Number(price) - 1) < 0 ) return 0;
            return (Number(price) - 1).toFixed(2);
        });
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='h5'>Set your price</Typography>
            <Typography variant='h6'>You can change it anytime.</Typography>
            <Box gap='5px' display='flex' mt='20px'>
                <Button sx={{ borderRadius: '50%', padding: '0px',fontSize: '2rem'}} onClick={handleDecrement}>-</Button>
                <TextField 
                    value={price}
                    textalign='center'
                    onChange={handleOnChange}
                    InputProps={{
                        startAdornment: '$',
                        endAdornment: 'CAD'
                    }}
                />
                <Button sx={{ borderRadius: '100%', padding: '10px 0px',fontSize: '1.4rem'}} onClick={handleIncrement}>+</Button>
            </Box>
        </Box>
    )
}

export default AddPrice;