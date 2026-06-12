@echo off
REM Student Management System - Frontend Startup Script (Windows)
REM This script will start the React development server

echo.
echo ========================================
echo Student Management System - Frontend
echo ========================================
echo.

cd frontend

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting frontend server on port 3000...
echo.
call npm start
