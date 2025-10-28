import pool from '../config/database.js';

export const trackingController = async (req, res) => {

    console.log("Tracking request received:", req.url);
    
    //parse tracking number from URL
    const url_parts = req.url.split('/');
    const trackingNumber = url_parts[2];
    console.log("URL parts:", url_parts);
    console.log("Tracking number:", trackingNumber);

    //validate tracking number
    if (!trackingNumber) {
        res.StatusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: 'Tracking number is required' }));
        return;
    }

    let connection;

    try {
        console.log('about to query db')
        connection = await pool.getConnection();

        //get package details from database
        // const package_sql = `SELECT * FROM package WHERE tracking_number = ?`;
        const package_sql = `
            SELECT 
                p.*,
                a.street_name,
                a.city_name,
                a.state_name,
                a.zip_code
            FROM package p
            LEFT JOIN address a ON p.recipient_address_id = a.address_id
            WHERE p.tracking_number = ?
        `;
        const [package_results] = await connection.execute(package_sql, [trackingNumber]);

        console.log('package results:', package_results);

        if (package_results.length === 0) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, message: 'Package not found' }));
            return;
        }

        const package_data = package_results[0];

        console.log('package data:', package_data);

        //get tracking events from database
        const tracking_sql = `SELECT * FROM tracking_event WHERE package_id = ? ORDER BY event_time DESC`;
        const [tracking_results] = await connection.execute(tracking_sql, [package_data.package_id]);

        console.log('tracking results:', tracking_results);

        //respond with package details and tracking events
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            success: true,
            package: package_data,
            tracking_events: tracking_results
        }));
    } catch (error) {
        console.error('Database query error:', error);
        console.error('error stack:', error.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
        success: false,
        message: 'Internal server error'
        }));
    } finally {
        connection.release();
    }
}