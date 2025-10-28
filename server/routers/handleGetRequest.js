import {trackingController} from '../controllers/trackingController.js';

export const handleGetRequest = (req, res) => {
    if (req.url.startsWith('/tracking')) {
        return trackingController(req, res);
    } else {
        res.statusCode = 404;
        res.end("URL not found");
    }
}