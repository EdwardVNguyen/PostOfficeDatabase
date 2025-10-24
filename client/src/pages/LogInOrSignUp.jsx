import './LogInOrSignUp.css';

import signUpImg from '../assets/signupImg.svg';

import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';

import { useState } from 'react';
import { useNavigate} from 'react-router-dom'

function handleSignUp(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const emailQuery = formData.get("email");
    const passwordQuery = formData.get("password");
    const phoneQuery = formData.get("phone")
    alert(`You searched for ${emailQuery} and ${passwordQuery} and ${phoneQuery}`);
  }

const LogInOrSignUp = ( {setAuth} ) => {
  const [mode, switchMode] = useState("Login"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  // function to handle user login, checks if email and password exist in the database
  const handleLogin = async (e) => {
    e.preventDefault();

    // get email and password from form
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password')

    // response - sends a GET request to server code, server code returns an JSON object {success: true/false message: 'message here'}
    // data - convert json code into javascript object
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login?email=${email}&password=${password}`);
    const data = await response.json(); 

    // navigate to home page if success, alert about wrong credentials otherwise
    if (data.success) {
      setAuth(true);
      navigate('/customerPage');
    } else {
      alert('Invalid email or password.');
    }
  };
   
  return (
    <div className="signContainer">
      <div className="left"> 
        <b className="bigText"> Start shipping with confidence today</b>
        <p className="description">SnailMail, a blazing fast delivery service</p>
        
        {mode === "Login" ? (
          <form className="signIn" onSubmit={handleLogin} >
            <AuthInput name="email" 
                       type="email" 
                       id="email-1" 
                       htmlFor="email" 
                       text="Email" 
                       value={email} 
                       onChange={ ((e) => setEmail(e.target.value))}
                       />
            <AuthInput name="password" 
                       type="password" 
                       id="password-1" 
                       htmlFor="password" 
                       text="Password" 
                       maxLength="100" 
                       value={password}
                       onChange={ (e) => setPassword(e.target.value)}
                       />
            <p className="switch"> Don't have an account,  
              <span className="click" onClick={()=>{switchMode("Signup")}}> click here </span> 
              to sign up! 
            </p>
            <AuthButton text="Log In"/> 
          </form>
        ) : (
          <form className="signUp" onSubmit={handleSignUp}>
            <AuthInput name="email" 
                       type="email" 
                       id="email-2" 
                       htmlFor="email" 
                       text="Email" 
                       value={email}
                       onChange={ ((e) => setEmail(e.target.value))} 
                       />
            <AuthInput name="password" 
                       type="password" 
                       id="password-2" 
                       htmlFor="password" 
                       text="Password" 
                       maxLength="100"
                       value={password}
                       onChange={ (e) => setPassword(e.target.value)}
                       />
            <AuthInput type="tel" 
                       name="phone"
                       id="phone-1" 
                       htmlFor="phone" 
                       text="Phone Number" 
                       value={phoneNumber}
                       onChange={ (e) => setPhoneNumber(e.target.value)}
                       />
            <p className="switch"> Already have an account,
              <span className="click" onClick={()=>{switchMode("Login")}}> click here </span>
              to log in!
            </p>
           <AuthButton text="Sign Up" /> 
          </form>
        )}
      </div>
      <div className="right">
        <img className="signUpImg" src={signUpImg} alt="image of Company Logo and man carrying packages"/>
      </div>
    </div>
  );
};

export default LogInOrSignUp;
