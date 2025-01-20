#!/bin/bash
set -e
# Source environment variables
set -a
source ../.env
set +a

REDIS_ENABLED=true


# Kill any processes using our ports
echo "Cleaning up ports..."
kill $(lsof -t -i:3000) 2>/dev/null || true
kill $(lsof -t -i:5000) 2>/dev/null || true
sleep 2 # Wait for ports to be freed

# Check Redis
if [[ "$REDIS_ENABLED" == "true" ]]; then
  echo "Redis is enabled, checking installation..."
  
  # Check if Redis is installed
  if ! command -v redis-cli &> /dev/null; then
    echo "Error: Redis is not installed but REDIS_ENABLED=true"
    echo "Please install Redis or set REDIS_ENABLED=false"
    exit 1
  fi
  
  # Check if Redis is already running
  if redis-cli ping &> /dev/null; then
    echo "Redis is already running"
  else
    echo "Starting Redis server..."
    redis-server &
    sleep 2
  fi
fi

# Install dependencies
echo "Installing dependencies..."
cd ..
npm install  # Install frontend dependencies
cd server
npm install  # Install backend dependencies

# Build frontend
echo "Building frontend..."
cd ..
npm run build

# Start backend server
echo "Starting backend server on port $SERVER_PORT..."
cd server
NODE_ENV=production node server.js &
BACKEND_PID=$!

# Wait for backend to be ready
echo "Waiting for backend to start..."
sleep 8


echo "Backend started successfully!"

# Start frontend server
echo "Starting frontend server on port $PORT..."
cd ../build
npx serve -s . -p $PORT # Use npx with port flag

# Verify backend is running
if ! curl -s http://localhost:$SERVER_PORT/api/health > /dev/null; then
  echo "Error: Backend failed to start"
  kill $BACKEND_PID 2>/dev/null || true
  exit 1
fi 