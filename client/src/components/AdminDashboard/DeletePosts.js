import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { axiosInstance } from '../../utils/axios';

const DeletePosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try {
          const response = await axiosInstance.get('/get/posts');
          setPosts(response.data);
        } catch (err) {
          console.log(`ERROR: ${err}`);
        }
    }

    const handleDeletePost = async (postId) => {
        try {
            await axiosInstance.delete(`/delete/posts/${postId}`)
            await fetchPosts();
        } catch(err) {
            console.log(`ERROR: ${err}`);
        }
    }

    return (
        <>
        {
            posts.map((post, i) => {
                return (
                    <Box key={i} display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='body2'>{post.title}</Typography>
                        <Button onClick={() => handleDeletePost(post._id)}>Delete</Button>
                    </Box>
                )
            })
        }
        </>
    )
}

export default DeletePosts;