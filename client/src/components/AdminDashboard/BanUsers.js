//Hooks
import React, { useEffect, useState } from 'react';

//HTML Components
import { Box, Button, Typography } from '@mui/material';

//axios api endpoint
import { axiosInstance } from '../../utils/axios';

const BanUsers = () => {
    //list of users
    const [users, setUsers] = useState([]);

    //fetches list of users on first render
    useEffect(() => {
       fetchUsers();
    }, [])

    //gets all users who arent currently banned
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

    //bans a selected user
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
                        <Typography variant='body2'>{user.email}</Typography>
                        <Button onClick={() => handleBanUser(user._id)}>Ban</Button>
                    </Box>
                )
            })
        }
        </>
    )
}

export default BanUsers;