const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '<YOUR_HOST>',
  user: '<YOUR_USER>',
  password: '<YOUR_PASSWORD>',
  database: '<YOUR_DATABASE>'
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
