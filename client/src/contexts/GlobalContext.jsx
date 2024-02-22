import React, { createContext, useReducer } from 'react';

const initialState = {
    isLoggedIn: null,
    uid: null
}

const Reducer = (state, action) => {
    switch(action.type) {
        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true,
                uid: action.uid ? action.uid : null
            }
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                uid: null
            }
        default:
            return state
    }
}

export const GlobalContext = createContext({
    state: initialState, 
    dispatch: () => null
})

export const GlobalContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}