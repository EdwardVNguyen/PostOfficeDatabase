import { loginController } from '../controllers/loginController.js'
import { emailCheckController } from '../controllers/emailCheckController.js'

export const handlePostRequest= (req, res) => {
  if ( req.url.startsWith('/login') ) {
    return loginController(req, res)
  } else if ( req.url.startsWith('/checkEmail') ) {
    return emailCheckController(req, res)
  } else {
    res.statusCode = 404
    res.end("URL not found")
  }
}
