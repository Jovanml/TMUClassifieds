//Import firebase
import { initializeApp } from 'firebase/app'

//fireabse config information
const firebaseConfig = {
    apiKey: process.env.REACT_APP_AUTH_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_AUTH_PROJECT_ID,
    storageBucket: process.env.REACT_APP_AUTH_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_AUTH_MSG_SENDER_ID,
    appId: process.env.REACT_APP_AUTH_APP_ID,
}

//initialize the firebase app
const app = initializeApp(firebaseConfig);

export default app;