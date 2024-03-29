import './App.css';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/login';
import { onAuthStateChanged } from '@firebase/auth';
import { GlobalContext } from './contexts/GlobalContext';
import { auth } from './services/auth';

function App() {
    const { dispatch } = useContext(GlobalContext);

    useEffect(() => {
        onAuthStateChanged(auth, async user => {
            if (user) {
                return dispatch({ type: 'LOG_IN' });
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
            </Routes>
        </BrowserRouter>
  );
}

export default App;
