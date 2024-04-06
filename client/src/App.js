//Syles
import './App.css';

//Hooks
import React, { useContext, useEffect } from 'react';

//Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Components
import Login from './components/Login/login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Homepage from './components/Homepage/Homepage';
import NewListing from './components/NewListing/NewListing';
import Protected from './components/Miscellaneous/Protected';
import MessageController from './components/Message/MessageController'
import Banned from './components/Miscellaneous/Banned';

//Functions
import { onAuthStateChanged } from '@firebase/auth';
import { GlobalContext } from './contexts/GlobalContext';
import { apiAuth, auth } from './services/auth';


function App() {
    //Global Context update
    const { dispatch } = useContext(GlobalContext);

    //update global context if auth state changes
    useEffect(() => {
        onAuthStateChanged(auth, async user => {
            if (user) {
                const userToken = await user.getIdToken();
                const userData = await apiAuth(userToken);
                return dispatch({ type: 'LOG_IN', payload: userData });
            } else {
                return dispatch({ type: 'LOG_OUT' });
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Protected><Homepage /></Protected>}/>
                <Route path='login' element={<Login />}/>
                <Route path='admin-dashboard' element={<Protected><AdminDashboard /></Protected>}/>
                <Route path='new-listing' element={<Protected><NewListing /></Protected>} />
                <Route path='message' element={<Protected><MessageController /></Protected>} />
                <Route path='banned' element={<Banned />} />
            </Routes>
        </BrowserRouter>
  );
}

export default App;
