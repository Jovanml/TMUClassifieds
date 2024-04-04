// Packages
import React, { useContext }  from 'react';
import { Navigate } from 'react-router-dom';

// Contexts and Hooks
import { GlobalContext } from '../../contexts/GlobalContext';
import { logIn } from '../../services/auth';

// Logos
import logo from '../../assets/logo.svg';
import googleLogo from '../../assets/google.png'; 

// Styles
import './login.css'; 

function Login() {
  const { state } = useContext(GlobalContext);

  if (state.isLoggedIn == null) return <></>;
  return state.isLoggedIn ? ( <Navigate to="/" />) 
  : (
    <div className='login-container'>
      <header className='login-header'>
        <img src={logo} alt='TMU Finds logo' className='login-logo' />
      </header>
      <main className='login-card-container'>
        <section className='login-card'>
          <h2 className='login-title'>Sign In</h2>
          <div>
            <div onClick={logIn} className="google-login">
              <img src={googleLogo} alt="Google logo" className="google-logo" />
              <span >Continue with Google</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
