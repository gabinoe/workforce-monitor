// db_config.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '<YOUR_HOST>',
  user: '<YOUR_USER>',
  password: '<YOUR_PASSWORD>',
  database: '<YOUR_DATABASE>'
});

module.exports = connection;
