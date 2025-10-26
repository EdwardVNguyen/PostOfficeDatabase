import './CustomerPage.css';
import { useState, useEffect } from 'react'
import { getCustomerData } from '../utils/getCustomerData.js'

const CustomerPage = ( {globalAuthId }) => {
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect( () => {
    const fetchData = async () => {
      const data = await getCustomerData(globalAuthId);
      setCustomerInfo(data);
    };
    fetchData();
  }, []);

  if (!customerInfo) return <div>Loading...</div>

  console.log(customerInfo);
    
  return (
    <div className="customerPageContainer">
      <div className="subContainer1">
        <div className="profile">
          <div className="profileLeft"> 
            <em className="icon"> Profile Icon </em>
            <em className="accountID"> Account ID</em>
            <div className="viewProfile"> View my profile</div>
          </div>
          <div className="postOffice"> Nearest post office </div>
        </div>
        <div className="tracker">
          <b> Tracking ID </b>
          <form className="customerPageTracker">
            <input />
            <button> Track </button>
          </form>
        </div> 
      </div>
      <div className="mostRecentPackage">
        Recent Packages
      </div>
      <div className="quickLinks">
        Quick Links
      </div>
    </div>
  );
};

export default CustomerPage;
