import { executeQuery, testConnection, getPackages } from '../controllers/queryController.js';

// Route handler function
export const handleRoute = (pathname, method, req, res) => {
    // Route matching
    if (pathname === '/api/query' && method === 'POST') {
        return executeQuery(req, res);
    }

    if (pathname === '/api/test' && method === 'GET') {
        return testConnection(req, res);
    }

    if (pathname === '/api/packages' && method === 'GET') {
        return getPackages(req, res);
    }

    // 404 - Route not found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
};