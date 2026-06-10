const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sameera@123",
  database: "student_management"
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;