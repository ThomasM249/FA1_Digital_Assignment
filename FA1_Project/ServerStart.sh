#!/bin/bash

# Start a simple HTTP server to serve static files in the background
python3 -m http.server 8000 &

# Wait a moment for the server to start
sleep 1

# Open the server in the user's primary browser
"$BROWSER" http://localhost:8000

#To run the Script run ./ServerStart.sh in the Terminal.