#!/bin/bash
# Student Management System - Backend Startup Script (Linux/Mac)
# This script will start the Node.js Express backend server

echo ""
echo "========================================"
echo "Student Management System - Backend"
echo "========================================"
echo ""

cd backend

echo "Checking if node_modules exists..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Dependencies already installed."
fi

echo ""
echo "Starting backend server on port 5000..."
echo ""
node server.js
