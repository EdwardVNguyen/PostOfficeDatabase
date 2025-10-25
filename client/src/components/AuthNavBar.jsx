import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import './NavBar.css';

import homeLogo from '../assets/homeLogo.svg';
import profileIcon from '../assets/profileIcon.svg'

const AuthNavBar = () => {
  const [isTiny, setIsTiny] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsTiny(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header-container header  ${isTiny ? "tiny" : ""}`}>
      <nav>
        <ul>
          <li>
            {/* NavLink allows to navigate different routes using the "to" prop */}
            <NavLink to="/customerPage" ><img className="homeLogo" src={homeLogo} alt="Home"/></NavLink> 
          </li>
        </ul>
      </nav>
      <div className="navigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/about">About</NavLink> 
          </li>
          <li>
            <NavLink to="/support">Support</NavLink> 
          </li>

          <li>
            <NavLink to="/userShipping">Shipping</NavLink> 
          </li>
          <li>
            <NavLink to="/userTracking">Tracking</NavLink> 
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <NavLink to="/userProfile" className="signInOrLogIn"> 
              <span>Profile</span>
              <img className="profileIcon" src={profileIcon} alt="Profile icon"/>
            </NavLink> 
          </li>
         </ul>
      </nav>
    </div>
    </header>
  );
};

export default AuthNavBar;
