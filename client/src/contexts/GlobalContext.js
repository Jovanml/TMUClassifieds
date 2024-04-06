import React, { createContext, useReducer } from 'react';

//initiale state
const initialState = {
    isLoggedIn: null,
    user: null
}

//Reducer to update state
const Reducer = (state, action) => {
    switch(action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default:
            return state
    }
}

//create Global Context
export const GlobalContext = createContext(initialState);

//Render child components under the Global Context Provider
export const GlobalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}