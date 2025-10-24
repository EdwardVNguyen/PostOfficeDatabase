import connection from '../config/database.js';

export const loginController = (req, res) => {

  const url = new URL(req.url, `http://${req.headers.host}`)
  const email = url.searchParams.get('email')
  const password = url.searchParams.get('password')

  const sql = `SELECT auth_id 
               FROM authentication
               WHERE LOWER(email) = LOWER(?) AND password = ?` 


  connection.query(sql, [email, password], (error, results) => {
        if (error) {
          console.log(error.message)

          res.statusCode = 500
          res.end('Query failed')
          return
        } else {
          console.log(results)
          
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results)) 
        }
      })
}
