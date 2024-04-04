import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { Navigate } from 'react-router'

const Protected = ({ children }) => {
    const { state } = useContext(GlobalContext);
    
    if (state.isLoggedIn == null) return <></>;
    return state.isLoggedIn ? (
        <>
            {children}
        </> 
    ) 
    : <Navigate to="/login"/>
}

export default Protected