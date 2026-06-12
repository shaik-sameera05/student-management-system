@echo off
REM Quick Test Script - Course CRUD Functionality (Windows)
REM This script tests all course API endpoints

setlocal enabledelayedexpansion

echo.
echo ========================================
echo Course CRUD - Quick Test Script
echo ========================================
echo.
echo Testing endpoints with curl...
echo.

set BASE_URL=http://localhost:5000

REM Test 1: Get all courses
echo 1. Testing GET /courses
curl -X GET "%BASE_URL%/courses"
echo.
echo ---
echo.

REM Test 2: Add a new course
echo 2. Testing POST /courses (Add new course)
set COURSE_DATA={^
  "name": "Test Course",^
  "instructor": "Test Instructor",^
  "credits": 3,^
  "schedule": "Mon, Wed 2:00 PM"^
}

for /f %%I in ('curl -s -X POST "%BASE_URL%/courses" -H "Content-Type: application/json" -d "%COURSE_DATA%" ^| findstr /i "id"') do (
  set COURSE_RESPONSE=%%I
)

echo %COURSE_RESPONSE%
echo.
echo ---
echo.

echo Test Complete - Check responses above for any errors
echo.
echo If you see "Connection refused" errors, make sure backend is running:
echo   cd backend && node server.js
echo.
