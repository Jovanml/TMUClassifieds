import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { axiosInstance } from '../../utils/axios';

const BanUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
       fetchUsers();
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/get/all/users?banned=false');
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

    const handleBanUser = async (userId) => {
        try {
            await axiosInstance.put('/ban/user', { id: userId })
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
                        <Typography variant='body2'>{user.name}</Typography>
                        <Button onClick={() => handleBanUser(user._id)}>Ban</Button>
                    </Box>
                )
            })
        }
        </>
    )
}

export default BanUsers;