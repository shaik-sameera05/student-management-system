# API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Get All Courses
**Endpoint:** `GET /courses`

**Description:** Retrieve all courses from the database

**Response:**
```json
[
  {
    "id": 1,
    "name": "Data Structures",
    "instructor": "Dr. John Smith",
    "credits": 4,
    "schedule": "Mon, Wed, Fri 10:00 AM",
    "created_at": "2024-06-12T10:30:00.000Z",
    "updated_at": "2024-06-12T10:30:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Database error

---

### 2. Add New Course
**Endpoint:** `POST /courses`

**Description:** Create a new course

**Request Body:**
```json
{
  "name": "Advanced Python",
  "instructor": "Prof. James Lee",
  "credits": 3,
  "schedule": "Tue, Thu 3:00 PM"
}
```

**Response:**
```json
{
  "message": "Course Added Successfully",
  "id": 6
}
```

**Status Codes:**
- `200 OK` - Course created
- `400 Bad Request` - Missing required fields
- `500 Internal Server Error` - Database error

**Required Fields:**
- `name` (string)
- `instructor` (string)
- `credits` (number)
- `schedule` (string)

---

### 3. Update Course
**Endpoint:** `PUT /courses/:id`

**Description:** Update an existing course

**URL Parameters:**
- `id` (integer) - Course ID

**Request Body:**
```json
{
  "name": "Advanced Python Programming",
  "instructor": "Prof. James Lee",
  "credits": 4,
  "schedule": "Tue, Thu 4:00 PM"
}
```

**Response:**
```json
{
  "message": "Course Updated Successfully"
}
```

**Status Codes:**
- `200 OK` - Course updated
- `500 Internal Server Error` - Database error or course not found

---

### 4. Delete Course
**Endpoint:** `DELETE /courses/:id`

**Description:** Delete a course

**URL Parameters:**
- `id` (integer) - Course ID

**Response:**
```json
{
  "message": "Course Deleted Successfully"
}
```

**Status Codes:**
- `200 OK` - Course deleted
- `500 Internal Server Error` - Database error or course not found

---

### 5. Get All Students
**Endpoint:** `GET /students`

**Description:** Retrieve all students from the database

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "branch": "Computer Science",
    "created_at": "2024-06-12T10:30:00.000Z"
  }
]
```

---

### 6. Add New Student
**Endpoint:** `POST /students`

**Description:** Create a new student

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "branch": "Information Technology"
}
```

**Response:**
```json
{
  "message": "Student Added Successfully"
}
```

---

### 7. Delete Student
**Endpoint:** `DELETE /students/:id`

**Description:** Delete a student

**URL Parameters:**
- `id` (integer) - Student ID

**Response:**
```json
{
  "message": "Student Deleted Successfully"
}
```

---

## Error Handling

All error responses follow this format:
```json
{
  "code": "ERROR_CODE",
  "message": "Error description"
}
```

## CORS

All endpoints have CORS enabled. Requests can be made from any origin.

## Authentication

Currently, no authentication is implemented. For production, implement JWT authentication.

## Rate Limiting

Not implemented. For production, consider adding rate limiting middleware.
