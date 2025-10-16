import './Home.css';
import homeIcon1 from '../assets/homeIcon1.svg'

const Home = () => {
  return (
    <>
      <div className="section1"> 
        <div className="subSection1">
          <b className="bigText"> With fast delivery times and affordable pricing, get ready to ship packages on the go with "Company Name" today!</b>
          <div className="line"/> 
          <small className="smallText"> Get a discounted price for every shipment</small>
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
