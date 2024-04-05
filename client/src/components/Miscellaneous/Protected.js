import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'
import { Navigate } from 'react-router'

const Protected = ({ children }) => {
    const { state } = useContext(GlobalContext);
    
    if (state.isLoggedIn == null) return <></>;
    if (state.isLoggedIn && state.user.banned === "true") return <Navigate to="/banned"/>
    return state.isLoggedIn ? (
        <>
            {children}
        </> 
    ) 
    : <Navigate to="/login"/>
}

export default Protected;