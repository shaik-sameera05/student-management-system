const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Management Backend Running");
});

// Get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// Add student
app.post("/students", (req, res) => {
  const { name, email, branch } = req.body;

  const sql =
    "INSERT INTO students (name, email, branch) VALUES (?, ?, ?)";

  db.query(sql, [name, email, branch], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Student Added Successfully"
    });
  });
});

// Delete student
app.delete("/students/:id", (req, res) => {
  const sql = "DELETE FROM students WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Student Deleted Successfully"
    });
  });
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});