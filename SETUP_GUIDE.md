# Student Management System - Setup Guide

## Project Structure

```
student-management-system/
├── backend/
│   ├── db.js                 # MySQL connection
│   ├── server.js             # Express server & API routes
│   ├── package.json          # Backend dependencies
│   ├── migrations.js         # Database initialization
│   └── setup.sql             # Database schema (optional)
│
└── frontend/
    ├── src/
    │   ├── App.js            # Main React component
    │   ├── App.css           # Styling
    │   └── ...other files
    └── package.json          # Frontend dependencies
```

## Features Implemented

### Dashboard
- Total Students, Courses, Faculty, and Placements cards
- Recent activity section

### Students Management
- View all students in table format
- Search functionality (by name, email, course)
- Add new student (modal form)
- Edit student details
- Delete student

### Courses Management (NEW)
- View all courses in table format
- Search functionality (by course name, instructor)
- Add new course (modal form)
- Edit course details (name, instructor, credits, schedule)
- Delete course
- Real-time sync with MySQL database via Express API

### Reports & Settings
- Placeholder pages for future expansion

## Database Setup

### Option 1: Auto-create Tables (Recommended)
When the backend server starts, it automatically creates the `courses` table and inserts sample data.

### Option 2: Manual Setup
Run the SQL commands in MySQL:
```sql
mysql -u root -p student_management < backend/setup.sql
```

Or execute the SQL commands directly in MySQL Workbench using `backend/setup.sql`.

## Installation & Running

### Backend Setup
```bash
cd backend
npm install
node server.js
```
Server runs on: `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

## API Endpoints

### Students
- `GET /students` - Fetch all students
- `POST /students` - Add new student
- `DELETE /students/:id` - Delete student

### Courses (NEW)
- `GET /courses` - Fetch all courses
- `POST /courses` - Add new course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

## Technology Stack

**Backend:**
- Node.js
- Express.js
- MySQL2
- CORS enabled

**Frontend:**
- React 19
- Axios for API calls
- CSS Grid & Flexbox
- Modern dark theme UI

## Database Schema

### Courses Table
```sql
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  instructor VARCHAR(255) NOT NULL,
  credits INT NOT NULL,
  schedule VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## How to Use

1. **Start Backend**: `cd backend && node server.js`
2. **Start Frontend**: `cd frontend && npm start`
3. **Access Dashboard**: Open `http://localhost:3000` in browser
4. **Navigate Sections**: Use sidebar to switch between Dashboard, Students, Courses, Reports, Settings
5. **Manage Courses**:
   - Click "Courses" in sidebar
   - View all courses from database
   - Click "+ Add Course" to create new course
   - Click "Edit" to modify course details
   - Click "Delete" to remove course
   - Use search bar to filter courses

## Sample Data

5 sample courses are automatically inserted:
- Data Structures (Dr. John Smith, 4 credits)
- Web Development (Ms. Sarah Johnson, 3 credits)
- Database Management (Prof. Michael Brown, 4 credits)
- Machine Learning (Dr. Emma Davis, 4 credits)
- Cloud Computing (Mr. James Wilson, 3 credits)

## Troubleshooting

**Port 5000 already in use:**
```bash
# Kill process on port 5000
# Windows: netstat -ano | findstr :5000
# Then: taskkill /PID <PID> /F
```

**MySQL connection error:**
- Verify credentials in `backend/db.js`
- Check MySQL service is running
- Database `student_management` exists

**Frontend cannot connect to backend:**
- Ensure backend is running on port 5000
- Check CORS is enabled
- Verify no firewall blocking localhost:5000

## Future Enhancements

- Authentication & Authorization
- Student-Course Enrollment
- Attendance Tracking
- Grade Management
- Advanced Analytics
- Email Notifications
- File Upload/Export
