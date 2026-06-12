#!/bin/bash
# Quick Test Script - Course CRUD Functionality
# Run this to verify all course operations work correctly

echo "========================================"
echo "Course CRUD - Quick Test Script"
echo "========================================"
echo ""
echo "Testing endpoints with curl..."
echo ""

BASE_URL="http://localhost:5000"

# Test 1: Get all courses
echo "1. Testing GET /courses"
curl -X GET "$BASE_URL/courses" 2>/dev/null | python3 -m json.tool
echo ""
echo "---"
echo ""

# Test 2: Add a new course
echo "2. Testing POST /courses (Add new course)"
COURSE_DATA='{
  "name": "Test Course",
  "instructor": "Test Instructor",
  "credits": 3,
  "schedule": "Mon, Wed 2:00 PM"
}'

NEW_COURSE=$(curl -X POST "$BASE_URL/courses" \
  -H "Content-Type: application/json" \
  -d "$COURSE_DATA" 2>/dev/null)

echo "$NEW_COURSE" | python3 -m json.tool
COURSE_ID=$(echo "$NEW_COURSE" | grep -o '"id":[0-9]*' | grep -o '[0-9]*')
echo ""
echo "Created course ID: $COURSE_ID"
echo "---"
echo ""

# Test 3: Update course (if ID was created)
if [ ! -z "$COURSE_ID" ]; then
  echo "3. Testing PUT /courses/$COURSE_ID (Update course)"
  UPDATE_DATA='{
    "name": "Updated Test Course",
    "instructor": "Updated Instructor",
    "credits": 4,
    "schedule": "Tue, Thu 3:00 PM"
  }'
  
  curl -X PUT "$BASE_URL/courses/$COURSE_ID" \
    -H "Content-Type: application/json" \
    -d "$UPDATE_DATA" 2>/dev/null | python3 -m json.tool
  echo ""
  echo "---"
  echo ""
  
  # Test 4: Delete course
  echo "4. Testing DELETE /courses/$COURSE_ID (Delete course)"
  curl -X DELETE "$BASE_URL/courses/$COURSE_ID" 2>/dev/null | python3 -m json.tool
  echo ""
else
  echo "Could not get course ID from POST response"
  echo "Make sure backend is running and database is connected"
fi

echo "========================================"
echo "Test Complete"
echo "========================================"
