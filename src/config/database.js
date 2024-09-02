const mysql = require('mysql2');
require('dotenv').config();

const port = process.env.DB_PORT;
const hostname = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PW;
const dbName = process.env.DB_NAME;

const connection = mysql.createPool({
  host     : hostname,
  port: port,
  user     : user,
  password : pass,
  database : dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


module.exports=connection