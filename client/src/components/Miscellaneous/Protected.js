//Hooks
import React, { useContext } from 'react'

//Global Context
import { GlobalContext } from '../../contexts/GlobalContext'

//Router Navigation
import { Navigate } from 'react-router'

const Protected = ({ children }) => {
    //global context state
    const { state } = useContext(GlobalContext);

    if (state.isLoggedIn == null) return <></>;
    //if banned route to banned
    if (state.isLoggedIn && state.user.banned === "true") return <Navigate to="/banned" />
    //if logged in render child components of website else go to login page
    return state.isLoggedIn ? (
        <>
            {children}
        </> 
    ) 
    : <Navigate to="/login"/>
}

export default Protected;