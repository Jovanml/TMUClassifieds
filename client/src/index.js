//Hooks
import React from 'react';

//DOM
import ReactDOM from 'react-dom/client';

//Stlyes
import './index.css';

//Compnents
import App from './App';

//Global Context
import { GlobalContextProvider } from './contexts/GlobalContext';

//Render webpage
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<GlobalContextProvider>
		<App />
	</GlobalContextProvider>
);