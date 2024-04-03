import React, { useState, useRef } from 'react';
import { Box, Typography, Input } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

const AddPhoto = () => {
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            fileInputRef.current.files = e.dataTransfer.files;
            setSelectedFile(droppedFile);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleTextClick = () => {
        fileInputRef.current.click();   
    };
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5'>Add some photos of your item</Typography>
            <Typography variant='h6' mb='20px'>You can add more or make changes later.</Typography>
            <Box
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{ border: dragging ? '2px dashed #aaa' : '2px dashed #ccc', pt: '100px', width: '500px', height: '300px', textAlign: 'center', cursor: 'default' }}
            >
                <CollectionsIcon sx={{fontSize: '48px'}}/>
                <Typography variant='h5'>Drag your photos here</Typography>
                <Typography variant='subtitle1' fontSize={'0.9rem'} mb='60px'>Chose only 1 photo</Typography>
                <Input
                    type="file"
                    inputRef={fileInputRef}
                    onChange={handleFileChange}
                    sx={{ display: 'none' }}
                    inputProps={{
                    accept: 'image/*'
                    }}
                />
                <Typography variant='subtitle1' fontSize={'0.9rem'} sx={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleTextClick}>Upload from your device</Typography>
                {selectedFile  && <Typography variant='caption'>{selectedFile.name}</Typography>}
            </Box>
        </Box>
    )
}

export default AddPhoto;