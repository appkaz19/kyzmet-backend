#!/bin/bash

# SSH Tunnel Keeper Script
# Maintains SSH tunnel connection until manually stopped

# Configuration
REMOTE_USER="short"
REMOTE_HOST="94.131.82.54"
LOCAL_PORT="15432"
REMOTE_PORT="5432"
REMOTE_TARGET="localhost"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

print_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Function to check if tunnel is active
is_tunnel_active() {
    # Check if port is being listened to
    if command -v lsof >/dev/null 2>&1; then
        lsof -ti:$LOCAL_PORT >/dev/null 2>&1
    elif command -v netstat >/dev/null 2>&1; then
        netstat -ln | grep ":$LOCAL_PORT " >/dev/null 2>&1
    elif command -v ss >/dev/null 2>&1; then
        ss -ln | grep ":$LOCAL_PORT " >/dev/null 2>&1
    else
        # Fallback: try to connect to the port
        (echo >/dev/tcp/localhost/$LOCAL_PORT) >/dev/null 2>&1
    fi
}

# Function to create SSH tunnel
create_tunnel() {
    print_status "Creating SSH tunnel: localhost:$LOCAL_PORT -> $REMOTE_HOST:$REMOTE_PORT"
    
    # SSH tunnel with options:
    # -L: Local port forwarding
    # -N: Don't execute remote command
    # -T: Disable pseudo-terminal allocation
    # -o ServerAliveInterval=60: Send keepalive every 60 seconds
    # -o ServerAliveCountMax=3: Disconnect after 3 failed keepalives
    # -o ExitOnForwardFailure=yes: Exit if port forwarding fails
    # -o ConnectTimeout=10: Connection timeout
    ssh -L $LOCAL_PORT:$REMOTE_TARGET:$REMOTE_PORT \
        -N -T \
        -o ServerAliveInterval=60 \
        -o ServerAliveCountMax=3 \
        -o ExitOnForwardFailure=yes \
        -o ConnectTimeout=10 \
        -o StrictHostKeyChecking=no \
        $REMOTE_USER@$REMOTE_HOST
}

# Function to cleanup on exit
cleanup() {
    print_warning "Received termination signal, cleaning up..."
    
    # Kill SSH processes for this tunnel
    pkill -f "ssh.*-L.*$LOCAL_PORT:$REMOTE_TARGET:$REMOTE_PORT.*$REMOTE_USER@$REMOTE_HOST"
    
    print_success "SSH tunnel closed. Goodbye!"
    exit 0
}

# Function to test connection
test_connection() {
    print_status "Testing SSH connection to $REMOTE_USER@$REMOTE_HOST..."
    if ssh -o ConnectTimeout=5 -o BatchMode=yes $REMOTE_USER@$REMOTE_HOST exit 2>/dev/null; then
        print_success "SSH connection test successful"
        return 0
    else
        print_error "SSH connection test failed"
        return 1
    fi
}

# Trap signals for graceful shutdown
trap cleanup SIGINT SIGTERM

# Main script
print_status "SSH Tunnel Keeper Started"
print_status "Local port: $LOCAL_PORT"
print_status "Remote: $REMOTE_USER@$REMOTE_HOST:$REMOTE_PORT"
print_status "Press Ctrl+C to stop"
echo

# Test SSH connection first
if ! test_connection; then
    print_error "Cannot establish SSH connection. Please check:"
    echo "  1. SSH key is configured"
    echo "  2. Host $REMOTE_HOST is reachable"
    echo "  3. User $REMOTE_USER exists"
    exit 1
fi

# Check if port is already in use
if is_tunnel_active; then
    print_warning "Port $LOCAL_PORT is already in use!"
    print_warning "Please close existing tunnel or use different port"
    exit 1
fi

# Connection loop
RETRY_COUNT=0
MAX_RETRIES=5
RETRY_DELAY=5

while true; do
    if is_tunnel_active; then
        print_success "Tunnel is active on localhost:$LOCAL_PORT"
        RETRY_COUNT=0
    else
        print_status "Tunnel not detected, attempting to create..."
        
        # Create tunnel (this will block until tunnel fails)
        create_tunnel
        
        # If we reach here, tunnel has failed
        RETRY_COUNT=$((RETRY_COUNT + 1))
        print_error "Tunnel failed (attempt $RETRY_COUNT/$MAX_RETRIES)"
        
        if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
            print_error "Maximum retry attempts reached. Exiting."
            exit 1
        fi
        
        print_warning "Retrying in $RETRY_DELAY seconds..."
        sleep $RETRY_DELAY
        
        # Exponential backoff
        RETRY_DELAY=$((RETRY_DELAY * 2))
        if [ $RETRY_DELAY -gt 60 ]; then
            RETRY_DELAY=60
        fi
    fi
    
    # Check tunnel status every 30 seconds
    sleep 30
done