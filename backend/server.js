const express = require("express");
const cors = require("cors");
const db = require("./db");
const { initializeDatabase } = require("./migrations");

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database tables
initializeDatabase();

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
  const { name, email, course, status } = req.body;

  if (!name || !email || !course || !status) {
    return res.status(400).json({ message: "Name, email, course, and status are required" });
  }

  const sql =
    "INSERT INTO students (name, email, course, status) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, course, status], (err, result) => {
    if (err) {
      console.error("Student insertion error:", err);
      return res.status(500).json({ message: "Failed to add student", error: err.message });
    }

    res.json({
      message: "Student Added Successfully",
      id: result.insertId
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

// Get all courses
app.get("/courses", (req, res) => {
  const sql = "SELECT * FROM courses";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// Add course
app.post("/courses", (req, res) => {
  const { name, instructor, credits, schedule } = req.body;

  // Validate required fields
  if (!name || !instructor || credits === undefined || credits === null || !schedule) {
    return res.status(400).json({ 
      message: "All fields are required",
      received: { name, instructor, credits, schedule }
    });
  }

  // Convert credits to number
  const creditsNum = parseInt(credits, 10);
  
  if (isNaN(creditsNum) || creditsNum <= 0) {
    return res.status(400).json({ message: "Credits must be a valid positive number" });
  }

  const sql =
    "INSERT INTO courses (name, instructor, credits, schedule) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, instructor, creditsNum, schedule], (err, result) => {
    if (err) {
      console.error("Course insertion error:", err);
      return res.status(500).json({ 
        message: "Failed to add course",
        error: err.message 
      });
    }

    res.json({
      message: "Course Added Successfully",
      id: result.insertId
    });
  });
});

// Update course
app.put("/courses/:id", (req, res) => {
  const { name, instructor, credits, schedule } = req.body;
  const courseId = parseInt(req.params.id, 10);

  // Validate required fields
  if (!name || !instructor || credits === undefined || credits === null || !schedule) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Convert credits to number
  const creditsNum = parseInt(credits, 10);
  
  if (isNaN(creditsNum) || creditsNum <= 0) {
    return res.status(400).json({ message: "Credits must be a valid positive number" });
  }

  if (isNaN(courseId)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  const sql = "UPDATE courses SET name=?, instructor=?, credits=?, schedule=? WHERE id=?";

  db.query(sql, [name, instructor, creditsNum, schedule, courseId], (err, result) => {
    if (err) {
      console.error("Course update error:", err);
      return res.status(500).json({ 
        message: "Failed to update course",
        error: err.message 
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      message: "Course Updated Successfully"
    });
  });
});

// Delete course
app.delete("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id, 10);

  if (isNaN(courseId)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  const sql = "DELETE FROM courses WHERE id=?";

  db.query(sql, [courseId], (err, result) => {
    if (err) {
      console.error("Course deletion error:", err);
      return res.status(500).json({ 
        message: "Failed to delete course",
        error: err.message 
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      message: "Course Deleted Successfully"
    });
  });
});

// Get reports
app.get("/reports", (req, res) => {
  const totalStudentsSql = "SELECT COUNT(*) AS totalStudents FROM students";
  const totalCoursesSql = "SELECT COUNT(*) AS totalCourses FROM courses";
  const activeStudentsSql = "SELECT COUNT(*) AS activeStudents FROM students WHERE status = 'Active'";
  const courseCountsSql = `
    SELECT c.name AS courseName, COUNT(s.id) AS studentCount
    FROM courses c
    LEFT JOIN students s ON s.course = c.name
    GROUP BY c.name
    ORDER BY studentCount DESC, c.name
  `;

  db.query(totalStudentsSql, (err, totalStudentsResult) => {
    if (err) {
      console.error("Error fetching total students:", err);
      return res.status(500).json({ message: "Failed to load report data" });
    }

    db.query(totalCoursesSql, (err, totalCoursesResult) => {
      if (err) {
        console.error("Error fetching total courses:", err);
        return res.status(500).json({ message: "Failed to load report data" });
      }

      db.query(activeStudentsSql, (err, activeStudentsResult) => {
        if (err) {
          console.error("Error fetching active students:", err);
          return res.status(500).json({ message: "Failed to load report data" });
        }

        db.query(courseCountsSql, (err, courseCountsResult) => {
          if (err) {
            console.error("Error fetching course counts:", err);
            return res.status(500).json({ message: "Failed to load report data" });
          }

          res.json({
            totalStudents: totalStudentsResult[0]?.totalStudents || 0,
            totalCourses: totalCoursesResult[0]?.totalCourses || 0,
            activeStudents: activeStudentsResult[0]?.activeStudents || 0,
            courseStudentCounts: courseCountsResult.map((row) => ({
              courseName: row.courseName,
              studentCount: row.studentCount
            }))
          });
        });
      });
    });
  });
});

// Get admin settings
app.get("/settings/admin", (req, res) => {
  const sql = "SELECT name, email FROM admin_settings ORDER BY id LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching admin settings:", err);
      return res.status(500).json({ message: "Failed to load admin settings" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Admin settings not found" });
    }

    res.json(result[0]);
  });
});

// Update admin settings
app.put("/settings/admin", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const sql = "UPDATE admin_settings SET name = ?, email = ?" +
    (password ? ", password = ?" : "") +
    " WHERE id = (SELECT id FROM admin_settings ORDER BY id LIMIT 1)";

  const params = password ? [name, email, password] : [name, email];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error saving admin settings:", err);
      return res.status(500).json({ message: "Failed to save admin settings" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Admin settings record not found" });
    }

    res.json({ message: "Admin settings updated successfully" });
  });
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});