import './App.css';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/login';
import SquareCard from './components/AdminDashboard/admin_dashboard';
import { onAuthStateChanged } from '@firebase/auth';
import { GlobalContext } from './contexts/GlobalContext';
import { apiAuth, auth } from './services/auth';
import Homepage from './components/Homepage';
import { Home } from '@mui/icons-material';
import NewListing from './components/NewListing/NewListing';
import Protected from './components/Private';

function App() {
    const { dispatch } = useContext(GlobalContext);

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
                <Route path='admin-dashboard' element={<Protected><SquareCard /></Protected>}/>
                <Route path='new-listing' element={<Protected><NewListing /></Protected>}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
