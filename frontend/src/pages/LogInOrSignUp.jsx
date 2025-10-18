import signUpImg from '../assets/signupImg.svg';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import './LogInOrSignUp.css';

const LogInOrSignUp = () => {
  return (
    <div className="signContainer">
      <div className="left"> 
        <b className="bigText"> Start shipping with confidence today</b>
        <p className="description">SnailMail, a blazing fast delivery service</p>
        <div className="subContainer">
          <AuthInput type="email" id="email-1" htmlFor="email" text="Email"/>
          <AuthInput type="password" id="password-1" htmlFor="password" text="Password"/>
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
