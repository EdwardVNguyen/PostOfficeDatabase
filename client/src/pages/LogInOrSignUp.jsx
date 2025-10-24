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
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  // on sign up, go to next slide
  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  // on sign up, go back if user wants to make changes
  const handleBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
  }

  // submits all user details and user signs up into system
  const handleSignUp = (e) => {
    e.preventDefault();

    console.log({
      email,password,phoneNumber,street,city,state,zipCode,firstName,middleName,lastName
    });
  };

  // function to handle user login, checks if email and password exist in the database
  const handleLogin = async (e) => {
    e.preventDefault();

    // get email and password from form
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password')

    // response - sends a POST request to server code, server code returns an JSON object {success: true/false message: 'message here'}
    // data - convert json code into javascript object
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                                   method: 'POST',
                                   headers: {'Content-Type': 'application/json' }, 
                                   body: JSON.stringify({email: `${email}`, password: `${password}` })
                                  });
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
    <div className="pageBackground">
    <div className="signContainer">
      <div className="left"> 
        
        {mode === "Login" ? (
          <>
          <b className="bigText"> Start shipping with confidence today</b>
          <p className="description">SnailMail, a blazing fast delivery service</p>
          <form className="signIn" onSubmit={handleLogin} >
            <AuthInput name="email" 
                       type="email" 
                       id="email-1" 
                       htmlFor="email-1" 
                       text="Email" 
                       value={email} 
                       onChange={ ((e) => setEmail(e.target.value))}
                       />
            <AuthInput name="password" 
                       type="password" 
                       id="password-1" 
                       htmlFor="password-1" 
                       text="Password" 
                       maxLength="100" 
                       value={password}
                       onChange={ (e) => setPassword(e.target.value)}
                       />
            <p className="switch"> Don't have an account,  
              <span className="click" onClick={()=>{switchMode("Signup")}}> click here </span> 
              to sign up! 
            </p>
            <AuthButton text="Log In" type="submit"/> 
          </form>
          </>
        ) : (
          <>
          <b className="bigText"> Ready to start your shipping journey?</b>
          <p className="description"> "A journey of a thousand miles begins with a single step."</p>
          <form className="signUp" onSubmit={step === 3 ? handleSignUp : handleNext }>
            {step === 1 && (
              <> 
              <AuthInput name="email" 
                       type="email" 
                       id="email-2" 
                       htmlFor="email-2" 
                       text="Email" 
                       value={email}
                       onChange={ ((e) => setEmail(e.target.value))} 
                       />
              <AuthInput name="password" 
                       type="password" 
                       id="password-2" 
                       htmlFor="password-2" 
                       text="Password" 
                       maxLength="100"
                       value={password}
                       onChange={ (e) => setPassword(e.target.value)}
                       />
              <AuthInput type="tel" 
                       name="phone"
                       id="phone-1" 
                       htmlFor="phone-1" 
                       text="Phone Number" 
                       value={phoneNumber}
                       onChange={ (e) => setPhoneNumber(e.target.value)}
                       />
                <p className="switch"> Already have an account,
                  <span className="click" onClick={()=>{switchMode("Login")}}> click here </span>
                    to log in!
                 </p>
              <AuthButton text="Continue" type="submit"/> 
              </>
            )}
            {step === 2 && (
              <> 
              <AuthInput type="text" 
                       name="street-address"
                       id="street-1" 
                       htmlFor="street-1" 
                       text="Street Name" 
                       value={street}
                       onChange={ (e) => setStreet(e.target.value)}
                       />
              <AuthInput type="text" 
                       name="city-address"
                       id="city-1" 
                       htmlFor="city-1" 
                       text="City Name" 
                       value={city}
                       onChange={ (e) => setCity(e.target.value)}
                       />
              <AuthInput type="text" 
                       name="state-address"
                       id="state-1" 
                       htmlFor="state-1" 
                       text="State" 
                       value={state}
                       onChange={ (e) => setState(e.target.value)}
                       />
              <AuthInput type="text" 
                       name="zipCode-address"
                       id="zip-1" 
                       htmlFor="zip-1" 
                       text="ZIP Code" 
                       value={zipCode}
                       onChange={ (e) => setZipCode(e.target.value)}
                       />
                 <p className="switch" /> 
                <div className="goBack">
                  <AuthButton text="Continue" type="submit"/> 
                  <AuthButton text="Back" type="button" onClick={handleBack}/>
                </div>
              </>
            )}
          {step === 3 && (
              <> 
              <AuthInput type="text" 
                       name="first-name"
                       id="fname-1" 
                       htmlFor="fname-1" 
                       text="First Name" 
                       value={firstName}
                       onChange={ (e) => setFirstName(e.target.value)}
                       />
              <AuthInput type="text" 
                       name="middle-name"
                       id="mname-1" 
                       htmlFor="mname-1" 
                       text="Middle Name" 
                       value={middleName}
                       onChange={ (e) => setMiddleName(e.target.value)}
                       />
              <AuthInput type="text" 
                       name="last-name"
                       id="lname-1" 
                       htmlFor="lname-1" 
                       text="Last Name" 
                       value={lastName}
                       onChange={ (e) => setLastName(e.target.value)}
                       />
                <p className="switch" /> 
                <div className="goBack">
                  <AuthButton text="Sign Up" type="submit"/> 
                  <AuthButton text="Back" type="button" onClick={handleBack}/>
                </div>

              </>
            )}

          </form>
          </>
        )}
      </div>
      <div className="middle" />
      <div className="right">
        <img className="signUpImg" src={signUpImg} alt="image of Company Logo and man carrying packages"/>
      </div>
    </div>
    </div>
  );
};

export default LogInOrSignUp;
