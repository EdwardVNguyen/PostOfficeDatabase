@echo off
echo Starting Post Office Database Servers...
echo.

REM Start backend server in new window
start "Backend Server" cmd /k "cd backend && npm start"

REM Wait a moment for backend to initialize
timeout /t 2 /nobreak >nul

REM Start frontend server in new window
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
