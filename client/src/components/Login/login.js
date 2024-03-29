import React, { useContext }  from 'react';
import './Style/login.css'; 
import logo from './Images/logo.jpg';
import googleLogo from './Images/google.png'; 
import { GlobalContext } from '../../contexts/GlobalContext';
import { Navigate } from 'react-router-dom';
import { logIn } from '../../services/auth';

function Login() {
  const { state } = useContext(GlobalContext);

  if (state.isLoggedIn == null) return <></>;
  return state.isLoggedIn ? ( <Navigate to="/" />) 
  : (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="TMU FINDS logo" className="logo" />
        <h1 className="title">TMU FINDS</h1>
      </header>
      <main className="App-main">
        <section className="sign-in">
          <h2>Sign In</h2>
          <div className="social-sign-in">
            <div className="google-sign-in">
              <img src={googleLogo} alt="Google logo" className="google-logo" />
              <span>Continue with Google</span>
            </div>
          </div>
          <div className="or-separator">
            <div className="or-line"></div>
            <span>OR</span>
            <div className="or-line"></div>
          </div>
          <form className="sign-in-form">
            <label htmlFor="username">Username or email address</label>
            <input type="text" id="username" name="username" placeholder="Username or email address" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" />
            <a href="#" className="forgot-password">Forgot your password?</a>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
          <p className="sign-up-message">Don't have an account? <span className="underline">Sign Up</span></p>
        </section>
      </main>
    </div>
  );
}

export default Login;
