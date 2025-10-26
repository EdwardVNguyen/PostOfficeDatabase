import { useEffect, useState } from "react";
import './UserShipping.css'

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const UserShipping = ( {globalAuthId }) => {
  const [packages, setPackages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 15; // number of packages per request
    const authId = globalAuthId;

    const fetchPackages = async (pageNum = 1) => {
      setLoading(true);
      try {
        const res = await fetch( `${import.meta.env.VITE_API_URL}/getCustomerPackageData?authId=${authId}&page=${pageNum}&limit=${limit}`);
        const data = await res.json();

        console.log(data);

        if (data.success) {
          // Append new packages if not the first page
          setPackages(data.packages);
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

  // Row Data: The data to be displayed.
    
    const rowData = packages.map(pkg => ({
      ID: pkg.package_id,
      Recipient: pkg.recipient_name,
      DropoffAddress: pkg.recipient_address_id,
      Type: pkg.package_type,
      Weight: pkg.weight,
      Dimensions: `${Math.round(pkg.length)}x${Math.round(pkg.width)}x${Math.round(pkg.height)}`,
      PackageStatus: pkg.package_status,
      DateCreated: pkg.created_at,
      LastModified: pkg.last_updated
    }));
        
  // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { 
          field: "ID",
          flex: 0.5
        },
        { 
          field: "Type",
          flex: 0.75
        },
        { field: "PackageStatus"},
        { 
          field: "Recipient",
          flex: 1.25
        },
        { 
          field: "DropoffAddress",
          flex: 1.25
        },
        { 
          field: "Dimensions",
          headerName: "LxWxH (in cm)"
        },
        { 
          field: "Weight",
          headerName: "Weight (in kg)",
          flex: 0.85,
        },
        { 
          field: "LastModified",
          flex: 0.85
        },
        { 
          field: "DateCreated",
          flex: 0.85
        }
    ]);

  return (
    <div className="userShippingContainer">
      <b> Your Shipments, Anytime Anywhere </b>
      <div className="ag-theme-alpine" style={{ height: 500,width: 1350}}>
          <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
          />
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i+1} 
            onClick={() => fetchPackages(i+1)}
            style={{ 
              margin: '0 5px', 
              fontWeight: page === i+1 ? 'bold' : 'normal'
            }}
          >
            {i+1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserShipping;
