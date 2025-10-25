import connection from '../config/database.js';
import { getRequestBody } from '../utils/getRequestBody.js'
import { badClientRequest, badServerRequest } from '../utils/badRequest.js'

export const emailCheckController = async (req, res) => {

  let email;
  
  try {
    const body = await getRequestBody(req)
    email = body.email
  } catch (err) {
    badClientRequest(res, err)
    return
  }
  
  const sql = `SELECT * 
               FROM authentication
               WHERE LOWER(email) = LOWER(?)` 

  // query database to find if there exists a user who has given email and password
  connection.query(sql, [email], (error, results) => {

        // if something wrong happened with the database query itself
        if (error) {
          badServerRequest(res)
          return
        } 

        // if email has not been taken just yet
        if (results.length === 0) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            exists: false,
            message: 'Email not already taken',
          })) 

        // email has already been taken 
        } else {
          res.statusCode = 401 
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            exists: true,
            message: 'Email has already been taken'
          }))
        }

      })
}
