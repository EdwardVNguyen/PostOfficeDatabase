import './LogInOrSignUp.css';
import signUpImg from '../assets/signupImg.svg';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';

const LogInOrSignUp = () => {
  const [mode, switchMode] = useState("Login"); 

  return (
    <div className="signContainer">
      <div className="left"> 
        <b className="bigText"> Start shipping with confidence today</b>
        <p className="description">SnailMail, a blazing fast delivery service</p>

        <div className="signIn">
          <AuthInput type="email" id="email-1" htmlFor="email" text="Email"/>
          <AuthInput type="password" id="password-1" htmlFor="password" text="Password"/>
          <p className="noAccount"> Don't have an account, 
    {/* TODO */} <span className={mode==="Login"}>click here </span> 
            to sign up! 
          </p>
          <AuthButton text="Log In"/> 
        </div>

      </div>
      <div className="right">
        <img className="signUpImg" src={signUpImg} alt="image of Company Logo and man carrying packages"/>
      </div>
    </div>
  );
};

export default LogInOrSignUp;
