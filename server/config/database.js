import mysql from 'mysql2'

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.getConnection( err => {
  if (err) return console.log('Error connecting to database:', err);

  console.log("Connected to MySQL database")
})

export default connection;
