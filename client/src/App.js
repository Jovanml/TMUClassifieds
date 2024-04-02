import './App.css';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/login';
import SignUp from './components/Signup/signup';
import SquareCard from './components/AdminDashboard/admin_dashboard';
import { onAuthStateChanged } from '@firebase/auth';
import { GlobalContext } from './contexts/GlobalContext';
import { apiAuth, auth } from './services/auth';
import Homepage from './components/Homepage';

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
                <Route path='/' element={<>Landing Page</>}/>
                <Route path='login' element={<Login />}/>
                <Route path='signup' element={<SignUp />}/>
                <Route path='admin-dashboard' element={<SquareCard />}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
