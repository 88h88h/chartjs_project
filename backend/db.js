const mysql2 = require("mysql2");
require("dotenv").config();

const connection = mysql2.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL database:", err);
        reject(err);
        return;
      }
      console.log("Connected to MySQL database!");
      resolve();
    });
  });
}

module.exports = { connection, connectToDatabase };
