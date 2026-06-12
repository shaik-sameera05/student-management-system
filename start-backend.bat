@echo off
REM Student Management System - Backend Startup Script (Windows)
REM This script will start the Node.js Express backend server

echo.
echo ========================================
echo Student Management System - Backend
echo ========================================
echo.

cd backend

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting backend server on port 5000...
echo.
node server.js
