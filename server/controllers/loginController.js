import connection from '../config/database.js';

// functionality for user login (customer, manager, employee)
export const loginController = (req, res) => {

  // get email and password
  const url = new URL(req.url, `http://${req.headers.host}`)
  const email = url.searchParams.get('email')
  const password = url.searchParams.get('password')

  const sql = `SELECT auth_id 
               FROM authentication
               WHERE LOWER(email) = LOWER(?) AND password = ?` 

  // query database to find if there exists a user who has given email and password
  connection.query(sql, [email, password], (error, results) => {

        // if something wrong happened with the database query itself
        if (error) {
          res.statusCode = 500
          res.setHeader('Content-Type','application/json')
          res.end(JSON.stringify({ 
            success: false, 
            message: 'Database query failed'
          }))
          return
        } 

        // one person exists in database given email and password (because email is unique)
        if (results.length === 1) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            success: true,
            message: 'Login success',
            auth_id: results[0].auth_id
          })) 

        // no user found in the database
        } else {
          res.statusCode = 401 // 401 lacks valid authentication credentials 
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            success: false,
            message: 'Invalid email or password'
          }))
        }

      })
}
