import connection from '../config/database.js';

// help function to read JSON body from request
const getRequestBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch (err) {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', err => reject(err))
  })
}

// functionality for user login (customer, manager, employee)
export const loginController = async (req, res) => {

  // get email and password
  let email, password

  try {
    const body = await getRequestBody(req)
    email = body.email
    password = body.password
  } catch (err) {
    res.statusCode = 400 // bad request from client
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({success: false, message: err.message}))
    return
  }
  
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
