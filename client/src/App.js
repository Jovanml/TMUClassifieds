import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO 
          - fix home path to point to homepage
          - add paths for other pages
          - route the buttons in header
        */}
        <Route path='/' element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
