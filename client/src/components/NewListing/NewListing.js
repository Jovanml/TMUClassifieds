import React, { useState } from 'react';
import { Box, Container, Button } from '@mui/material'
import ProgressBar from './ProgressBar';
import { AddCategory, AddPhoto, AddTitle, AddDescription, AddPrice, AddLoc} from './FormComponents';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addPost } from '../../services/posts';
import Header from '../header/Header'

const NewListing = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [category, setCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isValidInput, setIsValueInput] = useState(false);
    const [loc, setLoc] = useState('')

    const navigate = useNavigate();

    const formComponents = {
        0: <AddCategory category={category} setCategory={setCategory} setIsValueInput={setIsValueInput}/>,
        1: <AddPhoto selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>,
        2: <AddTitle title={title} setTitle={setTitle} setIsValueInput={setIsValueInput}/>,
        3: <AddDescription description={description} setDescription={setDescription} setIsValueInput={setIsValueInput} />,
        4: <AddLoc loc={loc} setLoc={setLoc} setIsValueInput={setIsValueInput} />,
        5: <AddPrice price={price} setPrice={setPrice}/>
    }

    const nextStep = () => {
        setCurrentStep(curr => curr + 1);
    }

    const prevStep = () => {
        setCurrentStep(curr => curr - 1);
    }
    
    const storage = getStorage();

    const handleSubmit = async () => {
        let fileUrl = '';
        if (selectedFile) {
            const name = +new Date() + "-" + selectedFile.name;
            const photoRef = ref(storage, `images/${name}`);
            const response = await uploadBytes(photoRef, selectedFile);
            fileUrl = await getDownloadURL(response.ref);
        }

        const formData = {
            category: category,
            photoUrl: fileUrl,
            title: title,
            description: description,
            price: Number(price).toFixed(2)
        }

        addPost(formData)
            .then(() => navigate('/'));
    }

    return (
        <>
            <Header showSearch={false } />
            <Box height='calc(100vh - 144px)' overflow='hidden'>
                <Container>
                    <Box minHeight='600px' m='30px 0px'>
                        {formComponents[currentStep]}
                    </Box>
                    <ProgressBar steps={6} current={currentStep}/>
                    <Box display='flex' justifyContent='space-between' mt='20px' height='45px'>
                        <Button variant='contained' backgroundcolor='black' disabled={currentStep === 0} onClick={prevStep}>Back</Button>
                        <Button variant='contained' backgroundcolor='black' disabled={!isValidInput} 
                        sx={{ display: currentStep !== 5 ? 'default' : 'none' }} onClick={nextStep}>Next</Button>
                        <Button variant='contained' backgroundcolor='black' sx={{ display: currentStep === 5 ? 'default' : 'none' }} 
                        onClick={handleSubmit}>Submit</Button>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default NewListing;