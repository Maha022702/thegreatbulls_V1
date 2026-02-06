#!/bin/bash

# Quick Deployment Guide - Run this to deploy The Great Bulls to AWS

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        AWS Deployment for The Great Bulls                 ║"
echo "║        Production Deployment Wizard                       ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not configured properly${NC}"
    echo "Please run: aws configure"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI is configured${NC}"
echo ""

# Step-by-step deployment
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 1: MongoDB Atlas Setup${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "1. Go to: https://www.mongodb.com/cloud/atlas/register"
echo "2. Create a free cluster (M0)"
echo "3. Create a database user"
echo "4. Whitelist all IPs (0.0.0.0/0)"
echo "5. Get your connection string"
echo ""
read -p "Have you set up MongoDB Atlas? (y/n): " mongodb_setup

if [ "$mongodb_setup" != "y" ]; then
    echo -e "${RED}Please set up MongoDB Atlas first${NC}"
    exit 1
fi

echo ""
read -p "Enter your MongoDB connection string: " mongodb_url
echo ""

# Generate NextAuth secret
echo -e "${YELLOW}Generating NextAuth secret...${NC}"
nextauth_secret=$(openssl rand -base64 32)
echo -e "${GREEN}✅ NextAuth secret generated${NC}"
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 2: Creating EC2 Instance${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "This will create a t3.medium EC2 instance (~$30/month)"
echo ""
read -p "Proceed with EC2 creation? (y/n): " create_ec2

if [ "$create_ec2" == "y" ]; then
    echo -e "${YELLOW}Creating EC2 instance...${NC}"
    ./setup-ec2.sh > ec2-setup.log 2>&1
    
    # Extract EC2 IP from log
    EC2_IP=$(grep "Public IP:" ec2-setup.log | tail -1 | awk '{print $3}')
    
    if [ -z "$EC2_IP" ]; then
        echo -e "${RED}❌ Failed to create EC2 instance${NC}"
        cat ec2-setup.log
        exit 1
    fi
    
    echo -e "${GREEN}✅ EC2 instance created: $EC2_IP${NC}"
else
    read -p "Enter your existing EC2 IP address: " EC2_IP
fi

echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 3: Configuring Environment${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Create .env.production
cat > .env.production << EOF
# Production Environment Variables
DATABASE_URL="$mongodb_url"
NEXTAUTH_SECRET="$nextauth_secret"
NEXTAUTH_URL="http://$EC2_IP:3000"
ALPHA_VANTAGE_API_KEY=6WR7RX2O5KUQ4EBE
NODE_ENV=production
PORT=3000

# AWS Configuration
AWS_REGION=us-east-1
# AWS credentials intentionally omitted. Set these in your environment or via `aws configure`.
# AWS_ACCESS_KEY_ID=REDACTED
# AWS_SECRET_ACCESS_KEY=REDACTED
EOF

echo -e "${GREEN}✅ .env.production created${NC}"

# Update deploy script with EC2 IP
sed -i "s/EC2_HOST=\"\"/EC2_HOST=\"$EC2_IP\"/" deploy-to-ec2.sh

echo -e "${GREEN}✅ Deployment script configured${NC}"
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}STEP 4: Deploying Application${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "This will:"
echo "  - Build your Next.js application"
echo "  - Upload files to EC2"
echo "  - Install dependencies"
echo "  - Start the application with PM2"
echo ""
read -p "Deploy now? (y/n): " deploy_now

if [ "$deploy_now" == "y" ]; then
    echo -e "${YELLOW}Deploying application...${NC}"
    echo ""
    
    # Wait for EC2 to be ready
    echo "Waiting for EC2 instance to be ready (60 seconds)..."
    sleep 60
    
    ./deploy-to-ec2.sh
    
    echo ""
    echo -e "${GREEN}✅ Deployment complete!${NC}"
fi

echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║                  🎉 DEPLOYMENT SUCCESSFUL! 🎉             ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${YELLOW}Your application is now live at:${NC}"
echo -e "${GREEN}➜  http://$EC2_IP:3000${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Access your application in the browser"
echo "2. Test login and course management"
echo "3. (Optional) Configure your domain name"
echo "4. (Optional) Set up SSL certificate"
echo ""
echo -e "${YELLOW}Useful Commands:${NC}"
echo "  SSH into server: ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@$EC2_IP"
echo "  View logs: ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@$EC2_IP 'pm2 logs'"
echo "  Restart app: ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@$EC2_IP 'pm2 restart thegreatbulls'"
echo ""
echo -e "${BLUE}For detailed documentation, see: DEPLOYMENT.md${NC}"
echo ""
