import React, { useState } from 'react';
import { Box, Container, Button } from '@mui/material'
import ProgressBar from './ProgressBar';
import { AddCategory, AddPhoto, AddTitle, AddDescription, AddPrice} from './FormComponents';

const formComponents = {
    0: <AddCategory />,
    1: <AddPhoto />,
    2: <AddTitle />,
    3: <AddDescription />,
    4: <AddPrice />
}

const NewListing = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep(curr => curr + 1);
    }

    const prevStep = () => {
        setCurrentStep(curr => curr - 1);
    }
    
    return (
        <Box sx={{ border: '1px solid red', height: '100vh'}}>
            <Container>
                <Box sx={{ minHeight: '600px', m: '30px 0px'}}>
                    {formComponents[currentStep]}
                </Box>
                <ProgressBar steps={5} current={currentStep}/>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '20px', height: '45px' }}>
                    <Button variant='contained' sx={{ backgroundColor: 'black' }} disabled={currentStep === 0} onClick={prevStep}>Back</Button>
                    <Button variant='contained' sx={{ backgroundColor: 'black' }} disabled={currentStep === 4} onClick={nextStep}>Next</Button>
                </Box>
            </Container>
        </Box>
    )
}

export default NewListing;