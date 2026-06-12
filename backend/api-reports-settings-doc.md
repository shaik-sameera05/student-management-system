# Reports and Settings API

## Endpoints

### GET /reports
Returns aggregated data for reports:
- totalStudents
- totalCourses
- activeStudents
- courseStudentCounts

Response example:
```
{
  "totalStudents": 6,
  "totalCourses": 5,
  "activeStudents": 4,
  "courseStudentCounts": [
    { "courseName": "Computer Science", "studentCount": 3 },
    { "courseName": "Data Science", "studentCount": 2 }
  ]
}
```

### GET /settings/admin
Returns admin profile settings from database.

Response example:
```
{
  "name": "Admin User",
  "email": "admin@example.com"
}
```

### PUT /settings/admin
Updates admin profile settings.
Request body:
```
{
  "name": "New Name",
  "email": "new@example.com",
  "password": "newpassword"
}
```

Response example:
```
{
  "message": "Admin settings updated successfully"
}
```
