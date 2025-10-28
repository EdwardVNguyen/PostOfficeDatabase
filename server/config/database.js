import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// testing to make sure connection works between node.js server and MySQL database
async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log('Connected to MySQL database')
    connection.release()
  } catch (err) {
    console.error('Error connecting to database:', err)
  }
}

testConnection();

export default pool;
