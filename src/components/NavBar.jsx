import { NavLink } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            {/* NavLink allows to navigate different routes using the "to" prop */}
            <NavLink to="/" className={({ isActive}) => { return isActive ? "active-link" : ""; }}>Home</NavLink> 
          </li>
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
  );
};

export default NavBar;
