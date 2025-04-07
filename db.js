const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Admin',
  password: 'Password@123', // change this!
  database: 'node_crud'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

module.exports = connection;
