import {
    GoogleAuthProvider,
    getAuth,
    signInWithRedirect,
    getRedirectResult,
    signOut,
} from '@firebase/auth';
import app from '../utils/firebase';
import { axiosInstance } from '../utils/axios';

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const logIn = async () => {
    signInWithRedirect(auth, provider)
    getRedirectResult(auth).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`ERROR: ${errorCode} ${errorMessage}`);
    })
}

export const logOut = () => {
    signOut(auth)
        .then(() => {
            console.log('SUCCESS: Login complete');
        })
        .catch(error => {
            console.log(`ERROR: ${error}`);
        })
}

export const apiAuth = async (token) => {
    try{
        const response = await axiosInstance.post("/login", {userToken: token});
        return response.data;
    } catch(error) {
        console.log(`ERROR: ${error}`);
        return null;
    }    
}