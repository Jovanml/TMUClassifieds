import React, { createContext, useReducer } from 'react';

const initialState = {
    isLoggedIn: null,
    user: null
}

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

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}