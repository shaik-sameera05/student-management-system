const db = require("./db");

const queryAsync = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });

// Create courses table
const createCoursesTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      instructor VARCHAR(255) NOT NULL,
      credits INT NOT NULL,
      schedule VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  await queryAsync(sql);
  console.log("Courses table created or already exists");
};

// Create students table and ensure required fields exist
const createStudentsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      course VARCHAR(255) NOT NULL DEFAULT '',
      status VARCHAR(50) NOT NULL DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  await queryAsync(sql);
  console.log("Students table created or already exists");
  await ensureStudentColumns();
};

const ensureStudentColumns = async () => {
  const columns = [
    { name: "course", definition: "VARCHAR(255) NOT NULL DEFAULT ''" },
    { name: "status", definition: "VARCHAR(50) NOT NULL DEFAULT 'Active'" },
    { name: "updated_at", definition: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" }
  ];

  for (const column of columns) {
    try {
      const result = await queryAsync(`SHOW COLUMNS FROM students LIKE ?`, [column.name]);
      if (result.length === 0) {
        await queryAsync(`ALTER TABLE students ADD COLUMN ${column.name} ${column.definition}`);
        console.log(`Students column ${column.name} added`);
      }
    } catch (err) {
      console.error(`Error ensuring students table column ${column.name}:`, err);
      throw err;
    }
  }
};

// Create admin settings table
const createAdminSettingsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS admin_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  await queryAsync(sql);
  console.log("Admin settings table created or already exists");
};

// Insert sample courses
const insertSampleCourses = async () => {
  const courses = [
    ["Data Structures", "Dr. John Smith", 4, "Mon, Wed, Fri 10:00 AM"],
    ["Web Development", "Ms. Sarah Johnson", 3, "Tue, Thu 2:00 PM"],
    ["Database Management", "Prof. Michael Brown", 4, "Mon, Wed 3:00 PM"],
    ["Machine Learning", "Dr. Emma Davis", 4, "Tue, Thu 10:00 AM"],
    ["Cloud Computing", "Mr. James Wilson", 3, "Mon, Wed, Fri 1:00 PM"],
  ];

  const sql = `
    INSERT INTO courses (name, instructor, credits, schedule)
    SELECT ?, ?, ?, ? FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM courses WHERE name = ? AND instructor = ?)
  `;

  for (const course of courses) {
    try {
      await queryAsync(sql, [...course, course[0], course[1]]);
    } catch (err) {
      console.error("Error inserting sample course:", err);
    }
  }

  console.log("Sample courses inserted");
};

// Insert sample students
const insertSampleStudents = async () => {
  const students = [
    ["Ava Patel", "ava.patel@email.com", "Computer Science", "Active"],
    ["Noah Walker", "noah.walker@email.com", "Business Analytics", "Active"],
    ["Mila Howard", "mila.howard@email.com", "Design", "Pending"],
    ["Leo Nguyen", "leo.nguyen@email.com", "Biotechnology", "Active"],
    ["Sophie Chen", "sophie.chen@email.com", "Data Science", "Active"],
    ["James Murphy", "james.murphy@email.com", "Engineering", "Pending"],
  ];

  const sql = `
    INSERT INTO students (name, email, course, status)
    SELECT ?, ?, ?, ? FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM students WHERE email = ?)
  `;

  for (const student of students) {
    try {
      await queryAsync(sql, [...student, student[1]]);
    } catch (err) {
      console.error("Error inserting sample student:", err);
    }
  }

  console.log("Sample students inserted");
};

// Insert default admin settings if missing
const insertDefaultAdminSettings = async () => {
  const sql = `
    INSERT INTO admin_settings (name, email, password)
    SELECT ?, ?, ? FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM admin_settings)
  `;

  await queryAsync(sql, ["Admin User", "admin@example.com", "password123"]);
  console.log("Default admin settings inserted if missing");
};

// Run initialization
const initializeDatabase = async () => {
  try {
    await createCoursesTable();
    await createStudentsTable();
    await createAdminSettingsTable();
    await insertSampleCourses();
    await insertSampleStudents();
    await insertDefaultAdminSettings();
    console.log("Database initialization complete");
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
};

module.exports = { initializeDatabase };
