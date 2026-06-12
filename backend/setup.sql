-- Create Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  credits INT NOT NULL,
  schedule VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Students Table (if not exists)
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  branch VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample courses data
INSERT INTO courses (name, instructor, credits, schedule) VALUES
('Data Structures', 'Dr. John Smith', 4, 'Mon, Wed, Fri 10:00 AM'),
('Web Development', 'Ms. Sarah Johnson', 3, 'Tue, Thu 2:00 PM'),
('Database Management', 'Prof. Michael Brown', 4, 'Mon, Wed 3:00 PM'),
('Machine Learning', 'Dr. Emma Davis', 4, 'Tue, Thu 10:00 AM'),
('Cloud Computing', 'Mr. James Wilson', 3, 'Mon, Wed, Fri 1:00 PM');
