#!/bin/bash

echo "Starting Post Office Database Servers..."
echo ""

# Start backend server in background
cd backend
npm start &
BACKEND_PID=$!

# Wait for backend to initialize
sleep 2

# Start frontend server
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
