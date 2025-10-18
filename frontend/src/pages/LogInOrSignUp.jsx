import './LogInOrSignUp.css';
import signUpImg from '../assets/signupImg.svg';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';

const LogInOrSignUp = () => {
  const [mode, switchMode] = useState("Login"); 
  const [phoneValue, setPhoneValue] = useState("");

  // gets input from AuthInput component
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData( (prev) => ({ ...prev, [name]: value}));
  }

  // removes non digits and formats it like so: 123-456-7890
  const handlePhone = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (input.length > 3 && input.length <= 6)
      input = `${input.slice(0, 3)}-${input.slice(3)}`;
    else if (input.length > 6)
      input = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
    setPhoneValue(input);
  };

  return (
    <div className="signContainer">
      <div className="left"> 
        <b className="bigText"> Start shipping with confidence today</b>
        <p className="description">SnailMail, a blazing fast delivery service</p>
        
        {mode === "Login" ? (
          <div className="signIn">
            <AuthInput name="email" type="email" id="email-1" htmlFor="email" text="Email" onChange={handleChange} value={formData.email}/>
            <AuthInput name="password" type="password" id="password-1" htmlFor="password" text="Password" onChange={handleChange} value={formData.password}/>
            <p className="switch"> Don't have an account,  
              <span className="click" onClick={()=>{switchMode("Signup")}}> click here </span> 
              to sign up! 
            </p>
            <AuthButton text="Log In"/> 
          </div>
        ) : (
          <div className="signUp">
            <AuthInput name="email" type="email" id="email-2" htmlFor="email" text="Email" onChange={handleChange} value={formData.email}/>
            <AuthInput name="password" type="password" id="password-2" htmlFor="password" text="Password" onChange={handleChange} value={formData.password}/>
            <AuthInput type="tel" id="phone-1" htmlFor="phone" text="Phone Number" onChange={handlePhone} value={phoneValue}/>
            <p className="switch"> Already have an account,
              <span className="click" onClick={()=>{switchMode("Login")}}> click here </span>
              to log in!
            </p>
           <AuthButton text="Sign Up" /> 
          </div>
        )}
      </div>
      <div className="right">
        <img className="signUpImg" src={signUpImg} alt="image of Company Logo and man carrying packages"/>
      </div>
    </div>
  );
};

export default LogInOrSignUp;
