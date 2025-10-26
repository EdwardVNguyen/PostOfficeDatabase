import { useEffect, useState } from "react";
import './UserShipping.css'

const UserShipping = ( {globalAuthId }) => {
  const [packages, setPackages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 10; // number of packages per request
    const authId = globalAuthId;

    const fetchPackages = async (pageNum = 1) => {
      setLoading(true);
      try {
        const res = await fetch( `${import.meta.env.VITE_API_URL}/getCustomerPackageData?authId=${authId}&page=${pageNum}&limit=${limit}`);
        const data = await res.json();

        console.log(data);

        if (data.success) {
          // Append new packages if not the first page
          setPackages(prev => pageNum === 1 ? data.packages : [...prev, ...data.packages]);
          setTotalPages(data.totalPages);
          setPage(pageNum);
        } else {
          console.error("Failed to fetch packages", data.message);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

  // initial fetch / packages first shown to customer
  useEffect( () => {
    fetchPackages(1);
  }, [authId]);

  return (
    <div className="userShippingContainer" >
      <h2>My Shipments</h2>
      <div className="userPackageList">
        <ul >
          {packages.map(pkg => (
            <li key={pkg.package_id}>
              {pkg.package_type} --- {pkg.package_status} --- {pkg.sender_name} to {pkg.recipient_name} --- {pkg.created_at}
            </li>
          ))}
        </ul>
      </div>
      {loading && <p>Loading...</p>}

      {page < totalPages && !loading && (
        <button onClick={() => fetchPackages(page + 1)}>Load More</button>
      )}

      {page >= totalPages && <p>No more packages</p>}
    </div>
  );
};

export default UserShipping;
