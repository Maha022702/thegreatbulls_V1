#!/bin/bash

# AWS EC2 Deployment Script for The Great Bulls Application
# This script automates the deployment process to AWS EC2

set -e

echo "🚀 Starting deployment to AWS EC2..."

# Configuration
APP_NAME="thegreatbulls"
EC2_USER="ubuntu"
EC2_HOST="" # Will be set after EC2 instance is created
KEY_FILE="$HOME/.ssh/thegreatbulls-key.pem"
REMOTE_DIR="/home/ubuntu/thegreatbulls"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if EC2_HOST is set
if [ -z "$EC2_HOST" ]; then
    echo -e "${RED}Error: EC2_HOST is not set. Please update this script with your EC2 instance IP address.${NC}"
    exit 1
fi

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo -e "${RED}Error: SSH key file not found at $KEY_FILE${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Building application locally...${NC}"
npm run build

echo -e "${YELLOW}Step 2: Connecting to EC2 instance...${NC}"
ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" << 'ENDSSH'
    # Update system packages
    echo "Updating system packages..."
    sudo apt-get update
    sudo apt-get upgrade -y

    # Install Node.js 20 if not already installed
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js 20..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi

    # Install PM2 globally if not installed
    if ! command -v pm2 &> /dev/null; then
        echo "Installing PM2..."
        sudo npm install -g pm2
    fi

    # Create application directory
    mkdir -p /home/ubuntu/thegreatbulls
    mkdir -p /home/ubuntu/thegreatbulls/logs
ENDSSH

echo -e "${YELLOW}Step 3: Uploading application files...${NC}"
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next' \
    -e "ssh -i $KEY_FILE" \
    ./ "$EC2_USER@$EC2_HOST:$REMOTE_DIR/"

echo -e "${YELLOW}Step 4: Installing dependencies and starting application...${NC}"
ssh -i "$KEY_FILE" "$EC2_USER@$EC2_HOST" << ENDSSH
    cd $REMOTE_DIR
    
    # Install dependencies
    echo "Installing dependencies..."
    npm ci --production
    
    # Generate Prisma Client
    echo "Generating Prisma Client..."
    npx prisma generate
    
    # Build Next.js application
    echo "Building Next.js application..."
    npm run build
    
    # Stop existing PM2 process if running
    pm2 delete $APP_NAME 2>/dev/null || true
    
    # Start application with PM2
    echo "Starting application with PM2..."
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    
    echo "✅ Application deployed successfully!"
    pm2 status
ENDSSH

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}Access your application at: http://$EC2_HOST:3000${NC}"
