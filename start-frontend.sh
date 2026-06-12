#!/bin/bash
# Student Management System - Frontend Startup Script (Linux/Mac)
# This script will start the React development server

echo ""
echo "========================================"
echo "Student Management System - Frontend"
echo "========================================"
echo ""

cd frontend

echo "Checking if node_modules exists..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Dependencies already installed."
fi

echo ""
echo "Starting frontend server on port 3000..."
echo ""
npm start
