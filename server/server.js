import http from 'node:http'
import { handleGetRequestRoutes } from './routers/getRequestRoutes.js'

const PORT = 8000 

const server = http.createServer( (req,res) => {

  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods','GET')

  try {
    if (req.method === 'GET') {
      handleGetRequestRoutes(req, res)
    } else {
      res.statusCode = 404
      res.end('Request method invalid')
    }
  } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Internal server error',
        message: error.message
    }));
  }
})    

server.listen(PORT, () => console.log(`listening to port: ${PORT}`))
