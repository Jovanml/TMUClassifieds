import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { axiosInstance } from '../../utils/axios';

const UnbanUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/get/all/users?banned=true');
            const data = response.data;  
            if (!data) return;

            data.forEach((obj, i, arr) => {
              arr[i] = JSON.parse(obj);
            });

            setUsers(data);
          } catch (err) {
            console.log(`ERROR: ${err}`);
          }
    }

    const handleUnbanUser = async (userId) => {
        try {
            await axiosInstance.put('/unban/user', { id: userId })
            await fetchUsers();
        } catch(err) {
            console.log(`ERROR: ${err}`);
        }
    }

    return (
        <>
         {
            users.map((user, i) => {
                return (
                    <Box key={i} display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='body2'>{user.email}</Typography>
                        <Button onClick={() => handleUnbanUser(user._id)}>Unban</Button>
                    </Box>
                )
            })
         }
        </>
    )
}

export default UnbanUsers;