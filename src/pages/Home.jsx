import './Home.css';
import homeIcon1 from '../assets/homeIcon1.svg';
import item1 from '../assets/item1.svg';
import item2 from '../assets/item2.svg';
import item3 from '../assets/item3.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('signUp');
  };

  return (
    <>
      <div className="section1"> 
        <div className="subSection1">
          <b className="bigText"> With fast delivery times and affordable pricing, get ready to ship packages on the go with "Company Name."</b>
          <div className="line"/> 
          <small className="smallText"> Get a discounted price for every shipment.</small>
          <button onClick={handleClick}>
            <span>
              Create an Account 
            </span>
          </button>
        </div>
        <img className="homeIcon" src={homeIcon1} alt="Graphics of man reading planning in a room filled with packages" loading="lazy"/>
      </div>
      <div className="section2">
          <div className="bigText">
            Get affordable pricing and quick delivery times. 
          </div>
          <div className="items">
            <div className="item">
              <img className="imgItem1" src={item1} alt="illustration of man moving package" loading="lazy"/>
              <b>Quick, easy shipping</b>
              <p> Send packages without the hassle. Fast, simple, and dependable from start to finish. </p>
            </div>
            <div className="item"> 
              <img className="imgItem2" src={item2} alt="illustration of woman managing packages" loading="lazy"/>
              <b>Your packages, our priority</b>
              <p>We treat every package like it’s our own. Secure, efficient, and always on schedule.</p>
            </div>
            <div className="item">
              <img className="imgItem3" src={item3} alt="illustration of man carrying package" loading="lazy"/>
              <b>Personal and reliable</b>
              <p>Reliable shipping backed by real people who care about your packages and your experience.</p>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;
