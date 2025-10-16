import './Home.css';
import homeIcon1 from '../assets/homeIcon1.svg'
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
          <b className="bigText"> With fast delivery times and affordable pricing, get ready to ship packages on the go with "Company Name"</b>
          <div className="line"/> 
          <small className="smallText"> Get a discounted price for every shipment</small>
          <button onClick={handleClick}>
            <span>
              Create an Account 
            </span>
          </button>
        </div>
        <img className="homeIcon" src={homeIcon1} alt="Graphics of man reading planning in a room filled with packages"/>
      </div>
      <div className="section2">
        Section 2
      </div>
    </>
  );
};

export default Home;
