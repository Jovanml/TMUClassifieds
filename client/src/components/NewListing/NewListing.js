//Hooks
import React, { useContext, useState } from 'react';

//HTML Elements
import { Box, Container, Button } from '@mui/material'

//Components
import ProgressBar from './ProgressBar';
import { AddCategory, AddPhoto, AddTitle, AddDescription, AddPrice, AddLoc } from './FormComponents';
import Header from '../Header/Header'

//Router
import { useNavigate } from 'react-router-dom';

//Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

//Service
import { addPost } from '../../services/posts';

//Global context
import { GlobalContext } from '../../contexts/GlobalContext';

const NewListing = () => {
    //current step number
    const [currentStep, setCurrentStep] = useState(0);

    //currently selected category
    const [category, setCategory] = useState('');

    //currently selected file
    const [selectedFile, setSelectedFile] = useState(null);

    //current title
    const [title, setTitle] = useState('');

    //current description
    const [description, setDescription] = useState('');

    //current price
    const [price, setPrice] = useState(0);

    //check if input is valid for text input
    const [isValidInput, setIsValueInput] = useState(false);

    //current loc
    const [loc, setLoc] = useState('')

    //naviagte in the router
    const navigate = useNavigate();

    //global context state
    const { state } = useContext(GlobalContext);

    //steps
    const formComponents = {
        0: <AddCategory category={category} setCategory={setCategory} setIsValueInput={setIsValueInput}/>,
        1: <AddPhoto selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>,
        2: <AddTitle title={title} setTitle={setTitle} setIsValueInput={setIsValueInput}/>,
        3: <AddDescription description={description} setDescription={setDescription} setIsValueInput={setIsValueInput} />,
        4: <AddLoc loc={loc} setLoc={setLoc} setIsValueInput={setIsValueInput} />,
        5: <AddPrice price={price} setPrice={setPrice}/>
    }

    //move on to next step
    const nextStep = () => {
        setCurrentStep(curr => curr + 1);
    }

    //go back to previous step
    const prevStep = () => {
        if (currentStep === 0) {
            return navigate("/");
        }

        setCurrentStep(curr => curr - 1);
    }

    //firebase storage
    const storage = getStorage();

    //handles submitting a post to the db
    //also upload image to firebase firestore and returns url for db
    const handleSubmit = async () => {
        let fileUrl = '';
        if (selectedFile) {
            const name = +new Date() + "-" + selectedFile.name;
            const photoRef = ref(storage, `images/${name}`);
            const response = await uploadBytes(photoRef, selectedFile);
            fileUrl = await getDownloadURL(response.ref);
        }

        const formData = {
            postType: category,
            picture: fileUrl,
            title: title,
            desc: description,
            price: Number(price).toFixed(2),
            location: loc,
            owner: state.user._id
        }

        addPost(formData)
            .then(() => navigate('/'));
    }

    return (
        <>
            <Header showSearch={false } />
            <Box>
                <Container>
                    <Box height='400px' m='30px 0px'>
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