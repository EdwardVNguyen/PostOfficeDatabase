import http from 'node:http'
import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const PORT = 8000 

const server = http.createServer( (req,res) => {
  if (req.url.startsWith('/login') && req.method === 'GET') {

    const url = new URL(req.url, `http://${req.headers.host}`)
    const email = url.searchParams.get('email')
    const password = url.searchParams.get('password')

    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET')

    connection.connect((err) => {
      if (err) return console.error(err.message)

      let sql = `SELECT auth_id 
                 FROM authentication
                 WHERE LOWER(email) = LOWER(?) AND password = ?` 

      connection.query(sql, [email, password], (error, results, fields) => {
        if (error) 
        {
          console.log(error.message)
          res.statusCode = 500
          res.end('Query failed')
        } else {
          console.log(results)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results))
        }
      })

      console.log('Connected to the MySQL server.')
      connection.end()
    });
  } else {
    req.statusCode = 404

    res.end("not found, but somehow connected to server now")
  }
})    

server.listen(PORT, () => console.log(`listening to port: ${PORT}`))
