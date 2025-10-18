# Server Start Guide

## Quick Start

Run both servers from the root directory:
```bash
start.bat
```

## Manual Start

**Backend:**
```bash
cd backend
npm start
```
Runs on: http://localhost:5000

**Frontend:**
```bash
cd frontend
npm run dev
```
Runs on: http://localhost:3000

## First Time Setup

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure database in backend/config/database.js
# Run sample data: mysql -u root -p < backend/sql/sample\ data\ push.sql
```

## Troubleshooting

**Port in use:**
```bash
netstat -ano | findstr :5000
taskkill //F //PID <PID>
```

**Database error:** Check MySQL is running and credentials in `backend/config/database.js`
