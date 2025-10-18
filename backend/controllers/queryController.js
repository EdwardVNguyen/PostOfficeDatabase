import connection from '../config/database.js';

export const executeQuery = (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'No query provided' });
    }

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(400).json({
                error: 'Query failed',
                message: error.message
            });
        }

        res.json({
            success: true,
            data: results,
            query: query
        });
    });
};

export const testConnection = (req, res) => {
    res.json({ message: 'Backend server is running!' });
};

export const getPackages = (req, res) => {
    const query = 'SELECT * FROM package';

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({
                error: 'Failed to fetch packages',
                message: error.message
            });
        }

        res.json({
            success: true,
            data: results
        });
    });
};