import React, { useContext } from 'react';
import './Style/signup.css';
import logo from '../Login/Images/logo.jpg';
import googleLogo from '../Login/Images/google.png';
import { GlobalContext } from '../../contexts/GlobalContext';
import { Navigate } from 'react-router-dom'; 

function SignUp() {
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
        <section className="sign-up">
          <h2>Create an Account</h2>
          <div className="social-sign-up">
            <div className="google-sign-up">
              <img src={googleLogo} alt="Google logo" className="google-logo" />
              <span>Continue with Google</span>
            </div>
          </div>
          <div className="or-separator">
            <div className="or-line"></div>
            <span>OR</span>
            <div className="or-line"></div>
          </div>
          <p className="enter-email-message">Enter your email address to create an account</p>
          <form className="sign-up-form">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" />
            <button type="submit" className="sign-up-button">Create Account</button>
          </form>
          <p className="sign-in-message">Already have an account? <span className="underline">Log in</span></p>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
