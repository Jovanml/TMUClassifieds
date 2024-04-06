//Hooks
import React, { useState, useEffect } from 'react';

//HTML Components
import { Box, Button, Typography } from '@mui/material';

//axios api endpoint
import { axiosInstance } from '../../utils/axios';

const DeletePosts = () => {
    //list of posts
    const [posts, setPosts] = useState([]);

    //fetches posts on first render
    useEffect(() => {
        fetchPosts();
    }, [])

    //fetches a list of all posts from the db
    const fetchPosts = async () => {
        try {
          const response = await axiosInstance.get('/get/posts');
          setPosts(response.data);
        } catch (err) {
          console.log(`ERROR: ${err}`);
        }
    }

    //deletes specific post from the db
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