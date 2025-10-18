import React, { useState, useEffect } from 'react';
import './TestQuery.css';

function TestQuery() {
    // State for manual SQL query section
    const [query, setQuery] = useState('');           // Stores the user's SQL query input
    const [results, setResults] = useState(null);     // Stores the query results from the server
    const [error, setError] = useState(null);         // Stores any error messages from failed queries
    const [loading, setLoading] = useState(false);    // Tracks loading state during query execution

    // State for auto-loaded packages section
    const [packages, setPackages] = useState([]);              // Stores the list of all packages
    const [packagesError, setPackagesError] = useState(null);  // Stores any error from fetching packages
    const [packagesLoading, setPackagesLoading] = useState(false); // Tracks loading state for packages

    // Automatically fetch all packages when component mounts
    useEffect(() => {
        fetchPackages();
    }, []);

    /**
     * Fetches all packages from the database via the backend API
     * This is an auto-query that runs on component mount
     */
    const fetchPackages = async () => {
        setPackagesLoading(true);
        setPackagesError(null);

        try {
            // Call the GET /api/packages endpoint to retrieve all packages
            const response = await fetch('http://localhost:5000/api/packages');
            const data = await response.json();

            if (response.ok) {
                // Store the packages data in state to display in the table
                setPackages(data.data);
            } else {
                setPackagesError(data.message || 'Failed to fetch packages');
            }
        } catch (err) {
            // Handle network errors or server unavailability
            setPackagesError('Failed to connect to server: ' + err.message);
        } finally {
            setPackagesLoading(false);
        }
    };

    /**
     * Executes a user-provided SQL query via the backend API
     * This is the manual query function triggered by the "Execute Query" button
     */
    const executeQuery = async () => {
        setLoading(true);
        setError(null);
        setResults(null);

        try {
            // Send the SQL query to the backend POST /api/query endpoint
            const response = await fetch('http://localhost:5000/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }), // Send the query in the request body
            });

            const data = await response.json();

            if (response.ok) {
                // Store the query results to display in the results section
                setResults(data.data);
            } else {
                setError(data.message || 'Query failed');
            }
        } catch (err) {
            // Handle network errors or server unavailability
            setError('Failed to connect to server: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Renders the results from the manual SQL query
     * Handles different result types: arrays (SELECT), objects (INSERT/UPDATE), or success messages
     */
    const renderResults = () => {
        if (!results) return null;

        // If results is an array of rows (typical for SELECT queries)
        if (Array.isArray(results) && results.length > 0) {
            // Extract column names from the first row
            const columns = Object.keys(results[0]);

            return (
                <div className="results-table">
                    <table>
                        <thead>
                            <tr>
                                {columns.map((col, index) => (
                                    <th key={index}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render each row of data */}
                            {results.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>
                                            {row[col] !== null ? String(row[col]) : 'NULL'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="row-count">Rows returned: {results.length}</p>
                </div>
            );
        }

        // If results is an object (INSERT/UPDATE/DELETE metadata)
        if (typeof results === 'object') {
            return (
                <div className="results-info">
                    <pre>{JSON.stringify(results, null, 2)}</pre>
                </div>
            );
        }

        // Default success message for queries that don't return data
        return (
            <div className="results-info">
                <p>Query executed successfully</p>
            </div>
        );
    };

    /**
     * Renders the auto-loaded packages table
     * Displays all packages from the database with loading and error states
     */
    const renderPackagesTable = () => {
        // Show loading message while fetching data
        if (packagesLoading) {
            return <p>Loading packages...</p>;
        }

        // Display error message if the fetch failed
        if (packagesError) {
            return (
                <div className="error-message">
                    <strong>Error:</strong> {packagesError}
                </div>
            );
        }

        // Handle case where no packages exist in database
        if (!packages || packages.length === 0) {
            return <p>No packages found.</p>;
        }

        // Extract column names from the first package object
        const columns = Object.keys(packages[0]);

        return (
            <div className="results-table">
                <table>
                    <thead>
                        <tr>
                            {/* Render column headers */}
                            {columns.map((col, index) => (
                                <th key={index}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render each package as a table row */}
                        {packages.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {row[col] !== null ? String(row[col]) : 'NULL'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="row-count">Total packages: {packages.length}</p>
            </div>
        );
    };

    return (
        <div className="test-query-container">
            <h1>SQL Test Query</h1>

            {/* Manual Query Section */}
            <div className="query-section">
                <h2>Manual Query</h2>
                <label htmlFor="sql-query">Enter SQL Query:</label>
                <textarea
                    id="sql-query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter SQL query"
                    rows={8}
                    cols={80}
                />
                <button
                    onClick={executeQuery}
                    disabled={!query.trim() || loading}
                    className="execute-btn"
                >
                    {loading ? 'Executing...' : 'Execute Query'}
                </button>
            </div>

            {error && (
                <div className="error-message">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {results && (
                <div className="results-section">
                    <h2>Results:</h2>
                    {renderResults()}
                </div>
            )}

            {/* Auto Query Section */}
            <div className="auto-query-section">
                <h2>All Packages</h2>
                {renderPackagesTable()}
            </div>
        </div>
    );
}

export default TestQuery;