import { getCustomerDataController } from '../controllers/getCustomerDataController.js'
import { getCustomerPackageDataController } from '../controllers/getCustomerPackageDataController.js'

export const handleGetRequest = (req, res) => {

  if ( req.url.startsWith('/getCustomerData') ) {
    return getCustomerDataController(req, res)
  } else if ( req.url.startsWith('/getCustomerPackageData')){
    return getCustomerPackageDataController(req, res)
  } 
  // if an api call is made to a url that isn't any of the above, return 404
  else {
    res.statusCode = 404
    res.end("URL not found")
  }
}
