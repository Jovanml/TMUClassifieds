import React from 'react';

//HTML Elements
import { Box } from '@mui/material';

const ProgressBar = ({ steps, current }) => {
  return (
    <Box sx={{ display: 'flex', gap: '5px'}}>
        {[...Array(steps)].map((_, i) => {
            return (
                <Box key={i} sx={{ backgroundColor: current === i ? '#0E6BC4' : '#0E6BC450', 
                    height: '8px', width: '100%'}}></Box>
            )
        })}
    </Box>
  )
}

export default ProgressBar;