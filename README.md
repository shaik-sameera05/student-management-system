# Student Management System

A modern, full-stack Student Management System built with React, Node.js, Express, and MySQL.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL Server
- npm or yarn

### 1. Setup Database
```bash
# MySQL is running, create database if not exists
mysql -u root -p
CREATE DATABASE student_management;
exit;
```

### 2. Start Backend Server
```bash
cd backend
npm install
node server.js
```
Backend will be running on `http://localhost:5000`

### 3. Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend will open at `http://localhost:3000`

## 📋 Features

### Dashboard
- ✅ Key metrics (Total Students, Courses, Faculty, Placements)
- ✅ Recent activity feed
- ✅ Responsive design

### Student Management
- ✅ View all students
- ✅ Search students (by name, email, course)
- ✅ Add new student
- ✅ Edit student details
- ✅ Delete student
- ✅ Status tracking (Active, Pending, Alumni, Inactive)

### Course Management (NEW)
- ✅ View all courses (synced with MySQL database)
- ✅ Search courses (by name, instructor)
- ✅ Add new course
- ✅ Edit course (name, instructor, credits, schedule)
- ✅ Delete course
- ✅ Credits tracking
- ✅ Schedule management

### Additional Pages
- 📊 Reports & Analytics (placeholder)
- ⚙️ Settings (placeholder)

## 🛠 Technology Stack

**Frontend:**
- React 19
- Axios for API calls
- CSS Grid & Flexbox
- Modern Dark Theme UI

**Backend:**
- Node.js
- Express.js 5
- MySQL2
- CORS enabled
- Auto-migration system

**Database:**
- MySQL with auto-initialization
- Sample data included

## 📁 Project Structure

```
student-management-system/
├── backend/
│   ├── db.js              # MySQL connection setup
│   ├── server.js          # Express server & API routes
│   ├── migrations.js      # Database table creation
│   ├── setup.sql          # SQL schema (manual setup)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js
│   └── package.json
│
├── SETUP_GUIDE.md         # Detailed setup instructions
├── API_DOCUMENTATION.md   # API endpoint reference
└── README.md
```

## 🔌 API Endpoints

### Courses
- `GET /courses` - Fetch all courses
- `POST /courses` - Create new course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

### Students
- `GET /students` - Fetch all students
- `POST /students` - Create new student
- `DELETE /students/:id` - Delete student

## 📊 Database Schema

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

## 🎨 UI Features

- Modern dark theme with blue accent colors
- Responsive grid layout
- Smooth transitions and hover effects
- Professional badges and status indicators
- Modal dialogs for forms
- Real-time search filtering
- Toast notifications for actions

## 🚨 Troubleshooting

**Backend won't start?**
- Check MySQL is running
- Verify database `student_management` exists
- Check db.js credentials match your MySQL setup

**Frontend can't connect to backend?**
- Ensure backend is running on port 5000
- Check firewall isn't blocking localhost:5000
- Check console for CORS errors

**Port already in use?**
- Backend (5000): `lsof -i :5000` then `kill -9 <PID>`
- Frontend (3000): `lsof -i :3000` then `kill -9 <PID>`

## 📖 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [API Documentation](./API_DOCUMENTATION.md) - API endpoint reference

## 🎯 Sample Data

The system includes 5 sample courses:
1. Data Structures - Dr. John Smith (4 credits)
2. Web Development - Ms. Sarah Johnson (3 credits)
3. Database Management - Prof. Michael Brown (4 credits)
4. Machine Learning - Dr. Emma Davis (4 credits)
5. Cloud Computing - Mr. James Wilson (3 credits)

## 🔮 Future Enhancements

- User authentication & authorization
- Student-Course enrollment system
- Attendance tracking
- Grade management & reports
- Advanced analytics & charts
- Email notifications
- Bulk import/export (CSV, Excel)
- Payment integration
- Mobile app version

## 📝 License

MIT License - Feel free to use this project for learning and development.

## 💡 Contributing

This is a learning project. Feel free to fork, modify, and improve!

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Happy coding! 🚀**
