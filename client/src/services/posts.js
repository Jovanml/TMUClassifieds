//Base Axios Instance
import { axiosInstance } from '../utils/axios';

export const addPost = async (data) => {
    //add post to db
    try {
        await axiosInstance.post("/create/posts", new URLSearchParams(data), { headers: 
            {"Content-Type": 'application/x-www-form-urlencoded'}
        });
    } catch(err) {
        console.log(`ERROR: ${err}`)
    }
}