import './UserShipping.css';

const FacilitiesPage = ({ globalAuthId }) => {
  const authId = globalAuthId;

  return (
    <div style={{ marginTop: '30px', width: '100%', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="userShippingTop">
          <div className="userShippingDesc">
            Facilities <span>Manage facility information</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesPage;
