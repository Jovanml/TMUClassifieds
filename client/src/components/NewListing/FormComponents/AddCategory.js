import React from 'react';
import { Box, Typography } from '@mui/material';
import { DocumentMagnifyingGlassIcon, ShoppingCartIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
const categories = [
    {
      label: 'Items Wanted',
      icon: <DocumentMagnifyingGlassIcon className='w-6 h-6'/>
    },
    {
      label: 'Items for Sale',
      icon: <ShoppingCartIcon className='w-6 h-6'/>
    },
    {
      label: 'Academic Services',
      icon: <AcademicCapIcon className='w-6 h-6' />
    }
]

const AddCategory = () => {
    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='h5'>Which of these best describe your item?</Typography>
            <Box gap='30px' display='flex' mt='40px'>
                {categories.map((category, i) => {
                    return (
                        <Box key={i} width='150px' border='1px solid #F1F3F6' borderRadius='20px' 
                        boxShadow='0px 2px 5px 0px rgba(0, 0, 0, 0.25);' p='30px 30px 20px 30px'
                        display='flex' flexDirection='column' alignItems='center'
                        sx={{"&:hover": {cursor: 'pointer', backgroundColor: '#E7EAF4'}}}
                        >   
                            <Box width='50%' mb='20px'>
                                {category.icon}
                            </Box>
                            {category.label}
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default AddCategory;