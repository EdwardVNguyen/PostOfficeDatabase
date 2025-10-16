import { NavLink } from "react-router-dom";
import homeLogo from '../assets/homeLogo.svg';
import './NavBar.css';

const NavBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            {/* NavLink allows to navigate different routes using the "to" prop */}
            <NavLink to="/" ><img className="homeLogo" src={homeLogo} alt="Home"/></NavLink> 
          </li>
        </ul>
      </nav>
      <div class="navigation">
      <nav>
        <ul>
          <li>
            <NavLink to="/about">About</NavLink> 
          </li>
          <li>
            <NavLink to="/support">Support</NavLink> 
          </li>

          <li>
            <NavLink to="/shipping">Shipping</NavLink> 
          </li>
          <li>
            <NavLink to="/tracking">Tracking</NavLink> 
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <NavLink to="/signIn">Sign In</NavLink> 
          </li>
          <li>
            <NavLink to="/signUp">Sign Up</NavLink> 
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
};

export default NavBar;
