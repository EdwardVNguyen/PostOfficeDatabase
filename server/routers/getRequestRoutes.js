import { loginController } from '../controllers/loginController.js'

export const handleGetRequestRoutes = (req, res) => {
  if ( req.url.startsWith('/login') ) {
    return loginController(req, res)
  } else {
    res.statusCode = 404
    res.end("URL not found")
  }
}
