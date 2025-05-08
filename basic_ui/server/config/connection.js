require('dotenv').config();
const mysql = require('mysql2');

// Create a 'connection pool' using the provided credentials
const connection = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : 'classmysql.engr.oregonstate.edu',
    user              : process.env.DB_USER,
    password          : process.env.DB_PW,
    database          : process.env.DB_NAME
}).promise(); // This makes it so we can use async / await rather than callbacks

module.exports = connection;