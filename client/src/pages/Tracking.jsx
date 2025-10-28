import { useState } from "react";
const Tracking = () => {
  // State declarations
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
    console.log('Tracking Number input changed:', e.target.value);
  };

  // fetch tracking data from backend
  const fetchTrackingData = async (tracking_num) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8000/tracking/${tracking_num}`);
      const data = await response.json();
      if (data.success) {
        setTrackingData(data);
        console.log('Fetched tracking data:', trackingData);
      } else {
        setError(data.message || 'Error fetching tracking data');
      }
    } catch (error) {
      setError('Failed to fetch tracking information. Please try again later.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /// form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to fetch tracking data will go here
    setError('');
    setTrackingData(null);

    if (!trackingNumber.trim()) {
      setError('Please enter a tracking Number.');
      return;
    }

    console.log('Submitted tracking Number:', trackingNumber);
    fetchTrackingData(trackingNumber);
    console.log('After fetch call, trackingData state:', trackingData);
  };

  //format date helper
  const formatDate = (date_string) => {
    const date = new Date(date_string);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // format time helper
  const formatTime = (date_string) => {
    const date = new Date(date_string);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  return (
    <div className="tracking-container">
      <h1>Track Your Package</h1>
      <form onSubmit={handleSubmit} className="tracking-form">
        <input
          type="text"
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isLoading} className="tracking-button">
          {isLoading ? 'Tracking...' : 'Track Package'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading && <p>Loading tracking information...</p>}

      {trackingData && (
        <div className="tracking-results">
          {/* Package Summary Section */}
          <div className="package-summary">
            <div className="tracking-number-display">
              <span className="label">Tracking Number:</span>
              <span className="value">{trackingData.package.tracking_number}</span>
            </div>
            
            <div className="status-section">
              <h2 className="status">{trackingData.package.package_status}</h2>
              <p className="destination">
                Delivering to: {trackingData.package.city_name}, {trackingData.package.state_name}
              </p>
            </div>

            <div className="package-info-grid">
              <div className="info-item">
                <span className="info-label">Recipient:</span>
                <span className="info-value">{trackingData.package.recipient_name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">
                  {trackingData.package.street_name}, {trackingData.package.city_name}, {trackingData.package.state_name} {trackingData.package.zip_code}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Package Type: </span>
                <span className="info-value">{trackingData.package.package_type}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Weight:</span>
                <span className="info-value">{trackingData.package.weight} kg</span>
              </div>
            </div>
          </div>

          {/* Travel History Section */}
          <div className="travel-history">
            <h2>Travel History</h2>
            
            {trackingData.tracking_events.length > 0 ? (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date/Time</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {trackingData.tracking_events.map((event) => (
                    <tr key={event.tracking_event_id}>
                      <td className="date-time-cell">
                        <div className="date">{formatDate(event.event_time)}</div>
                        <div className="time">{formatTime(event.event_time)}</div>
                      </td>
                      <td className="activity-cell">
                        {event.event_type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No tracking events available yet.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Tracking;
