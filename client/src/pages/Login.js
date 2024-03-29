import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { Navigate } from 'react-router-dom'
import { logIn } from '../services/auth'


const Login = () => {
    const { state } = useContext(GlobalContext);

    if (state.isLoggedIn == null) return <></>;
    
    return state.isLoggedIn ? ( <Navigate to="/dashboard" />) 
    : (
        <>
            <div>Login Page</div>
            <button onClick={logIn}>Login</button>
        </>
        
    )
}

export default Login