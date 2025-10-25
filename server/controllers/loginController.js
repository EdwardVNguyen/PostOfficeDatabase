import pool from '../config/database.js'
import { getJSONRequestBody } from '../utils/getJSONRequestBody.js'
import { badClientRequest, badServerRequest } from '../utils/badRequest.js'

// functionality for user login (customer, manager, employee)
export const loginController = async (req, res) => {

  // get email and password
  let email, password

  try {
    const body = await getJSONRequestBody(req)
    email = body.email
    password = body.password
  } catch (err) {
    badClientRequest(res, err)
    return
  }
  
  const sql = `SELECT auth_id 
               FROM authentication
               WHERE LOWER(email) = LOWER(?) AND password = ?` 

  // query database to find if there exists a user who has given email and password
  try {
    const [results] = await pool.execute(sql, [email,password])
    
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

  // if something wrong happened with the database query itself
  } catch {
    badServerRequest(res)
  }
} 
