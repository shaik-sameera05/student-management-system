
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "./App.css";

const sidebarItems = [
  { label: "Dashboard", key: "dashboard" },
  { label: "Students", key: "students" },
  { label: "Courses", key: "courses" },
  { label: "Reports", key: "reports" },
  { label: "Settings", key: "settings" },
];

const sampleStudents = [
  { id: 1, name: "Ava Patel", email: "ava.patel@email.com", course: "Computer Science", status: "Active" },
  { id: 2, name: "Noah Walker", email: "noah.walker@email.com", course: "Business Analytics", status: "Active" },
  { id: 3, name: "Mila Howard", email: "mila.howard@email.com", course: "Design", status: "Pending" },
  { id: 4, name: "Leo Nguyen", email: "leo.nguyen@email.com", course: "Biotechnology", status: "Active" },
  { id: 5, name: "Sophie Chen", email: "sophie.chen@email.com", course: "Data Science", status: "Active" },
  { id: 6, name: "James Murphy", email: "james.murphy@email.com", course: "Engineering", status: "Pending" },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState(sampleStudents);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", course: "", status: "Active" });
  const [courseFormData, setCourseFormData] = useState({ name: "", instructor: "", credits: "", schedule: "" });
  const [loading, setLoading] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [reportsData, setReportsData] = useState({
    totalStudents: 0,
    totalCourses: 0,
    activeStudents: 0,
    courseStudentCounts: []
  });
  const [settingsForm, setSettingsForm] = useState({ name: "", email: "", password: "" });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      alert("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async () => {
    setReportsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/reports");
      setReportsData(response.data || {
        totalStudents: 0,
        totalCourses: 0,
        activeStudents: 0,
        courseStudentCounts: []
      });
    } catch (err) {
      console.error("Error fetching reports:", err.response?.data || err.message);
      alert("Failed to load reports");
    } finally {
      setReportsLoading(false);
    }
  };

  const fetchAdminSettings = async () => {
    setSettingsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/settings/admin");
      setSettingsForm({ name: response.data.name || "", email: response.data.email || "", password: "" });
    } catch (err) {
      console.error("Error fetching admin settings:", err.response?.data || err.message);
      alert("Failed to load settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  const saveAdminSettings = async () => {
    if (!settingsForm.name.trim() || !settingsForm.email.trim()) {
      alert("Name and email are required");
      return;
    }

    try {
      await axios.put("http://localhost:5000/settings/admin", {
        name: settingsForm.name.trim(),
        email: settingsForm.email.trim(),
        password: settingsForm.password
      });
      alert("Admin settings saved successfully");
      setSettingsForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error("Error saving admin settings:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Failed to save settings";
      alert(errorMsg);
    }
  };

  const exportReportCsv = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Students", reportsData.totalStudents],
      ["Total Courses", reportsData.totalCourses],
      ["Active Students", reportsData.activeStudents],
      [],
      ["Course Name", "Student Count"]
    ];

    reportsData.courseStudentCounts.forEach((item) => {
      rows.push([item.courseName, item.studentCount]);
    });

    const csvContent = rows.map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (activePage === "courses") {
      fetchCourses();
    }
    if (activePage === "reports") {
      fetchReports();
    }
    if (activePage === "settings") {
      fetchAdminSettings();
    }
  }, [activePage]);

  const filteredStudents = useMemo(() => {
    const normalized = searchQuery.toLowerCase();
    return students.filter((student) =>
      student.name.toLowerCase().includes(normalized) ||
      student.email.toLowerCase().includes(normalized) ||
      student.course.toLowerCase().includes(normalized)
    );
  }, [searchQuery, students]);

  const filteredCourses = useMemo(() => {
    const normalized = searchQuery.toLowerCase();
    return courses.filter((course) =>
      course.name.toLowerCase().includes(normalized) ||
      course.instructor.toLowerCase().includes(normalized)
    );
  }, [searchQuery, courses]);

  const stats = {
    totalStudents: students.length,
    totalCourses: courses.length,
    totalFaculty: 32,
    placements: 81,
  };

  const openModal = (student = null) => {
    if (student) {
      setEditingId(student.id);
      setFormData(student);
    } else {
      setEditingId(null);
      setFormData({ name: "", email: "", course: "", status: "Active" });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const openCourseModal = (course = null) => {
    if (course) {
      setEditingCourseId(course.id);
      setCourseFormData(course);
    } else {
      setEditingCourseId(null);
      setCourseFormData({ name: "", instructor: "", credits: "", schedule: "" });
    }
    setCourseModalOpen(true);
  };

  const closeCourseModal = () => {
    setCourseModalOpen(false);
    setEditingCourseId(null);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCourseFormChange = (field, value) => {
    setCourseFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveStudent = () => {
    if (!formData.name || !formData.email || !formData.course) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingId ? { ...formData, id: editingId } : student
        )
      );
    } else {
      const nextId = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;
      setStudents((prev) => [...prev, { id: nextId, ...formData }]);
    }
    closeModal();
  };

  const saveCourse = async () => {
    // Validate all fields
    if (!courseFormData.name || !courseFormData.name.trim()) {
      alert("Please enter course name");
      return;
    }
    if (!courseFormData.instructor || !courseFormData.instructor.trim()) {
      alert("Please enter instructor name");
      return;
    }
    if (!courseFormData.credits || courseFormData.credits === "") {
      alert("Please enter credits");
      return;
    }
    if (!courseFormData.schedule || !courseFormData.schedule.trim()) {
      alert("Please enter schedule");
      return;
    }

    // Convert credits to number
    const creditsNum = parseInt(courseFormData.credits, 10);
    if (isNaN(creditsNum) || creditsNum <= 0) {
      alert("Credits must be a positive number");
      return;
    }

    const courseData = {
      name: courseFormData.name.trim(),
      instructor: courseFormData.instructor.trim(),
      credits: creditsNum,
      schedule: courseFormData.schedule.trim()
    };

    try {
      if (editingCourseId) {
        await axios.put(`http://localhost:5000/courses/${editingCourseId}`, courseData);
        setCourses((prev) =>
          prev.map((course) =>
            course.id === editingCourseId 
              ? { ...courseData, id: editingCourseId } 
              : course
          )
        );
        alert("Course updated successfully");
      } else {
        const response = await axios.post("http://localhost:5000/courses", courseData);
        setCourses((prev) => [...prev, { id: response.data.id, ...courseData }]);
        alert("Course added successfully");
      }
      closeCourseModal();
    } catch (err) {
      console.error("Error saving course:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Failed to save course";
      alert(errorMsg);
    }
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((prev) => prev.filter((student) => student.id !== id));
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/courses/${id}`);
        setCourses((prev) => prev.filter((course) => course.id !== id));
        alert("Course deleted successfully");
      } catch (err) {
        console.error("Error deleting course:", err.response?.data || err.message);
        const errorMsg = err.response?.data?.message || "Failed to delete course";
        alert(errorMsg);
      }
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">SMS</div>
          <div>
            <h1>StudentHub</h1>
            <p>Management Dashboard</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activePage === item.key ? "active" : ""}`}
              onClick={() => setActivePage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Version 2.0</p>
          <small>Secure & Reliable</small>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <h2>
              {activePage === "dashboard"
                ? "Dashboard"
                : activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h2>
            <p className="topbar-subtitle">Welcome back. Here's what's happening today.</p>
          </div>
          <div className="profile-card">
            <div className="avatar">M</div>
            <div>
              <p className="profile-name">Morgan Lee</p>
              <p className="profile-role">Administrator</p>
            </div>
          </div>
        </header>

        <section className="content">
          {activePage === "dashboard" && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <span>Total Students</span>
                  <h2>{stats.totalStudents}</h2>
                  <p className="stat-desc">Enrolled this semester</p>
                </div>
                <div className="stat-card accent">
                  <span>Courses</span>
                  <h2>{stats.totalCourses}</h2>
                  <p className="stat-desc">Active programs</p>
                </div>
                <div className="stat-card">
                  <span>Faculty</span>
                  <h2>{stats.totalFaculty}</h2>
                  <p className="stat-desc">Teaching staff</p>
                </div>
                <div className="stat-card accent">
                  <span>Placements</span>
                  <h2>{stats.placements}%</h2>
                  <p className="stat-desc">Success rate</p>
                </div>
              </div>

              <div className="panel-card">
                <h3>Recent Activity</h3>
                <p className="text-muted">5 new enrollments this week • 2 course updates • System running smoothly</p>
              </div>
            </>
          )}

          {activePage === "students" && (
            <div className="panel-card full">
              <div className="panel-header">
                <div>
                  <h3>Student Directory</h3>
                  <p>Manage and track all student records.</p>
                </div>
                <button className="primary-button" onClick={() => openModal()}>
                  + Add Student
                </button>
              </div>

              <div className="table-toolbar">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search by name, email, or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="result-count">{filteredStudents.length} results</span>
              </div>

              <div className="table-container">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td className="font-weight-600">{student.name}</td>
                          <td>{student.email}</td>
                          <td>{student.course}</td>
                          <td>
                            <span
                              className={`badge ${
                                student.status === "Active" ? "badge-active" : "badge-pending"
                              }`}
                            >
                              {student.status}
                            </span>
                          </td>
                          <td className="action-buttons">
                            <button
                              className="table-button edit"
                              onClick={() => openModal(student)}
                            >
                              Edit
                            </button>
                            <button
                              className="table-button delete"
                              onClick={() => deleteStudent(student.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activePage === "courses" && (
            <div className="panel-card full">
              <div className="panel-header">
                <div>
                  <h3>Course Management</h3>
                  <p>Manage and track all courses offered.</p>
                </div>
                <button className="primary-button" onClick={() => openCourseModal()}>
                  + Add Course
                </button>
              </div>

              <div className="table-toolbar">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search courses or instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="result-count">{filteredCourses.length} courses</span>
              </div>

              {loading ? (
                <p className="text-center text-muted">Loading courses...</p>
              ) : (
                <div className="table-container">
                  <table className="student-table">
                    <thead>
                      <tr>
                        <th>Course Name</th>
                        <th>Instructor</th>
                        <th>Credits</th>
                        <th>Schedule</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <tr key={course.id}>
                            <td className="font-weight-600">{course.name}</td>
                            <td>{course.instructor}</td>
                            <td>
                              <span className="badge badge-active">{course.credits} credits</span>
                            </td>
                            <td>{course.schedule}</td>
                            <td className="action-buttons">
                              <button
                                className="table-button edit"
                                onClick={() => openCourseModal(course)}
                              >
                                Edit
                              </button>
                              <button
                                className="table-button delete"
                                onClick={() => deleteCourse(course.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted">
                            No courses found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activePage === "reports" && (
            <div className="panel-card full">
              <div className="panel-header">
                <div>
                  <h3>Reports & Analytics</h3>
                  <p>Analyze student and course data with live metrics.</p>
                </div>
                <button className="secondary-button" onClick={exportReportCsv}>
                  Export CSV
                </button>
              </div>

              {reportsLoading ? (
                <p className="text-center text-muted">Loading report data...</p>
              ) : (
                <>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <span>Total Students</span>
                      <h2>{reportsData.totalStudents}</h2>
                      <p className="stat-desc">Number of enrolled students</p>
                    </div>
                    <div className="stat-card accent">
                      <span>Total Courses</span>
                      <h2>{reportsData.totalCourses}</h2>
                      <p className="stat-desc">Courses currently available</p>
                    </div>
                    <div className="stat-card">
                      <span>Active Students</span>
                      <h2>{reportsData.activeStudents}</h2>
                      <p className="stat-desc">Students with active status</p>
                    </div>
                  </div>

                  <div className="panel-card">
                    <div className="panel-header">
                      <div>
                        <h3>Course Enrollment Overview</h3>
                        <p>Student count grouped by course.</p>
                      </div>
                    </div>
                    <div className="table-container">
                      <table className="student-table">
                        <thead>
                          <tr>
                            <th>Course Name</th>
                            <th>Student Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportsData.courseStudentCounts.length > 0 ? (
                            reportsData.courseStudentCounts.map((item) => (
                              <tr key={item.courseName}>
                                <td className="font-weight-600">{item.courseName}</td>
                                <td>{item.studentCount}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="text-center text-muted">
                                No course enrollment data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activePage === "settings" && (
            <div className="panel-card full">
              <div className="panel-header">
                <div>
                  <h3>Admin Profile</h3>
                  <p>Update your administrator settings securely.</p>
                </div>
              </div>

              {settingsLoading ? (
                <p className="text-center text-muted">Loading settings...</p>
              ) : (
                <div className="form-card">
                  <label>
                    Name
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Admin Name"
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="admin@example.com"
                    />
                  </label>
                  <label>
                    Password
                    <input
                      type="password"
                      value={settingsForm.password}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter new password"
                    />
                  </label>
                  <div className="modal-actions">
                    <button className="primary-button" onClick={saveAdminSettings}>
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {courseModalOpen && (
        <div className="modal-backdrop" onClick={closeCourseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCourseId ? "Edit Course" : "Add New Course"}</h3>
              <button className="close-button" onClick={closeCourseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <label>
                Course Name
                <input
                  type="text"
                  placeholder="Enter course name"
                  value={courseFormData.name}
                  onChange={(e) => handleCourseFormChange("name", e.target.value)}
                />
              </label>
              <label>
                Instructor Name
                <input
                  type="text"
                  placeholder="Enter instructor name"
                  value={courseFormData.instructor}
                  onChange={(e) => handleCourseFormChange("instructor", e.target.value)}
                />
              </label>
              <label>
                Credits
                <input
                  type="number"
                  placeholder="Enter credits"
                  min="1"
                  step="1"
                  value={courseFormData.credits}
                  onChange={(e) => handleCourseFormChange("credits", e.target.value)}
                />
              </label>
              <label>
                Schedule
                <input
                  type="text"
                  placeholder="e.g., Mon, Wed, Fri 10:00 AM"
                  value={courseFormData.schedule}
                  onChange={(e) => handleCourseFormChange("schedule", e.target.value)}
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="secondary-button" onClick={closeCourseModal}>
                Cancel
              </button>
              <button className="primary-button" onClick={saveCourse}>
                {editingCourseId ? "Update" : "Save"} Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
