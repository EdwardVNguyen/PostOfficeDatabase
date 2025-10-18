import connection from '../config/database.js';

// Helper function to send JSON response
const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

export const executeQuery = (req, res) => {
    const { query } = req.body;

    if (!query) {
        return sendJSON(res, 400, { error: 'No query provided' });
    }

    connection.query(query, (error, results) => {
        if (error) {
            return sendJSON(res, 400, {
                error: 'Query failed',
                message: error.message
            });
        }

        sendJSON(res, 200, {
            success: true,
            data: results,
            query: query
        });
    });
};

export const testConnection = (req, res) => {
    sendJSON(res, 200, { message: 'Backend server is running!' });
};

export const getPackages = (req, res) => {
    const query = 'SELECT * FROM package';

    connection.query(query, (error, results) => {
        if (error) {
            return sendJSON(res, 500, {
                error: 'Failed to fetch packages',
                message: error.message
            });
        }

        sendJSON(res, 200, {
            success: true,
            data: results
        });
    });
};