const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'Admin',
  password: 'Password@123', // set your MySQL password
  database: 'studentdb'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

module.exports = conn;
