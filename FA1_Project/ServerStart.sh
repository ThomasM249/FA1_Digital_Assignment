#!/bin/bash

# Ensure this script always serves from the project directory
cd "$(dirname "$0")" || exit 1

# Stop any stale http.server instance on the same port (if running)
pid=$(lsof -t -i:8000 -sTCP:LISTEN 2>/dev/null || true)
if [ -n "$pid" ]; then
  echo "Stopping stale server process $pid"
  kill "$pid" || true
fi

# Start a fresh static server from current project folder
python3 -m http.server 8000  &
server_pid=$!

sleep 1

echo "Serving from $(pwd) at http://localhost:8000"

# Open browser (if available)
if [ -n "$BROWSER" ]; then
  "$BROWSER" http://localhost:8000
else
  echo "BROWSER environment variable is not set; please open http://localhost:8000 manually."
fi

echo "Server PID: $server_pid"
