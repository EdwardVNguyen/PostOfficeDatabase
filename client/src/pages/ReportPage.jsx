import './UserShipping.css';

const ReportPage = ({ globalAuthId }) => {
  const authId = globalAuthId;

  return (
    <div style={{ marginTop: '30px', width: '100%', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="userShippingTop">
          <div className="userShippingDesc">
            Manager Reports <span>System overview and statistics</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
