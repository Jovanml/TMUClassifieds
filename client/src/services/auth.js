//Firebase
import {
    GoogleAuthProvider,
    getAuth,
    signInWithRedirect,
    getRedirectResult,
    signOut,
} from '@firebase/auth';

//Firebase Initialized Instance
import app from '../utils/firebase';

//Axios
import { axiosInstance } from '../utils/axios';

//Auth Provider
const provider = new GoogleAuthProvider();

//Auth
export const auth = getAuth(app);

//Login using Google Auth
export const logIn = async () => {
    signInWithRedirect(auth, provider)
    getRedirectResult(auth).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`ERROR: ${errorCode} ${errorMessage}`);
    })
}

//Logout using Google Auth
export const logOut = () => {
    signOut(auth)
        .then(() => {
            console.log('SUCCESS: Login complete');
        })
        .catch(error => {
            console.log(`ERROR: ${error}`);
        })
}

//Connect login process to db
//Creates user opject if they dont exsist
export const apiAuth = async (token) => {
    try{
        const response = await axiosInstance.post("/login", {userToken: token});
        return response.data;
    } catch(error) {
        console.log(`ERROR: ${error}`);
        return null;
    }    
}