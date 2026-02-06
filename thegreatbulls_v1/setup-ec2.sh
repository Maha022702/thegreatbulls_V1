#!/bin/bash

# AWS EC2 Setup Script - Creates and configures EC2 instance for The Great Bulls
# This script uses AWS CLI to create and configure a production-ready EC2 instance

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🚀 Setting up AWS EC2 instance for The Great Bulls..."

# Configuration
INSTANCE_NAME="thegreatbulls-production"
INSTANCE_TYPE="t3.medium"  # 2 vCPUs, 4GB RAM - good for production
AMI_ID="ami-0c7217cdde317cfec"  # Ubuntu 22.04 LTS in us-east-1
KEY_NAME="thegreatbulls-key"
SECURITY_GROUP_NAME="thegreatbulls-sg"
REGION="us-east-1"

echo -e "${YELLOW}Step 1: Creating EC2 Key Pair...${NC}"
# Create key pair if it doesn't exist
if [ ! -f "$HOME/.ssh/$KEY_NAME.pem" ]; then
    aws ec2 create-key-pair \
        --key-name $KEY_NAME \
        --query 'KeyMaterial' \
        --output text \
        --region $REGION > "$HOME/.ssh/$KEY_NAME.pem"
    chmod 400 "$HOME/.ssh/$KEY_NAME.pem"
    echo -e "${GREEN}✅ Key pair created: $HOME/.ssh/$KEY_NAME.pem${NC}"
else
    echo -e "${YELLOW}Key pair already exists${NC}"
fi

echo -e "${YELLOW}Step 2: Creating Security Group...${NC}"
# Check if security group exists
SG_ID=$(aws ec2 describe-security-groups \
    --filters "Name=group-name,Values=$SECURITY_GROUP_NAME" \
    --query 'SecurityGroups[0].GroupId' \
    --output text \
    --region $REGION 2>/dev/null || echo "None")

if [ "$SG_ID" == "None" ]; then
    # Create security group
    SG_ID=$(aws ec2 create-security-group \
        --group-name $SECURITY_GROUP_NAME \
        --description "Security group for The Great Bulls application" \
        --region $REGION \
        --query 'GroupId' \
        --output text)
    
    # Add inbound rules
    # Allow SSH (port 22)
    aws ec2 authorize-security-group-ingress \
        --group-id $SG_ID \
        --protocol tcp \
        --port 22 \
        --cidr 0.0.0.0/0 \
        --region $REGION
    
    # Allow HTTP (port 80)
    aws ec2 authorize-security-group-ingress \
        --group-id $SG_ID \
        --protocol tcp \
        --port 80 \
        --cidr 0.0.0.0/0 \
        --region $REGION
    
    # Allow HTTPS (port 443)
    aws ec2 authorize-security-group-ingress \
        --group-id $SG_ID \
        --protocol tcp \
        --port 443 \
        --cidr 0.0.0.0/0 \
        --region $REGION
    
    # Allow Node.js app (port 3000)
    aws ec2 authorize-security-group-ingress \
        --group-id $SG_ID \
        --protocol tcp \
        --port 3000 \
        --cidr 0.0.0.0/0 \
        --region $REGION
    
    echo -e "${GREEN}✅ Security group created: $SG_ID${NC}"
else
    echo -e "${YELLOW}Security group already exists: $SG_ID${NC}"
fi

echo -e "${YELLOW}Step 3: Launching EC2 Instance...${NC}"
# Launch EC2 instance
INSTANCE_ID=$(aws ec2 run-instances \
    --image-id $AMI_ID \
    --instance-type $INSTANCE_TYPE \
    --key-name $KEY_NAME \
    --security-group-ids $SG_ID \
    --region $REGION \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME}]" \
    --query 'Instances[0].InstanceId' \
    --output text)

echo -e "${GREEN}✅ EC2 instance launched: $INSTANCE_ID${NC}"
echo -e "${YELLOW}Waiting for instance to be running...${NC}"

# Wait for instance to be running
aws ec2 wait instance-running \
    --instance-ids $INSTANCE_ID \
    --region $REGION

# Get public IP
PUBLIC_IP=$(aws ec2 describe-instances \
    --instance-ids $INSTANCE_ID \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text \
    --region $REGION)

echo -e "${GREEN}✅ Instance is running!${NC}"
echo -e "${GREEN}Public IP: $PUBLIC_IP${NC}"
echo ""
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ EC2 Setup Complete!${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Instance Details:${NC}"
echo -e "  Instance ID: $INSTANCE_ID"
echo -e "  Public IP: $PUBLIC_IP"
echo -e "  Instance Type: $INSTANCE_TYPE"
echo -e "  Key File: $HOME/.ssh/$KEY_NAME.pem"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo -e "1. Update deploy-to-ec2.sh with: EC2_HOST=\"$PUBLIC_IP\""
echo -e "2. Set up MongoDB Atlas and update .env.production"
echo -e "3. SSH into instance: ssh -i ~/.ssh/$KEY_NAME.pem ubuntu@$PUBLIC_IP"
echo -e "4. Run deployment: ./deploy-to-ec2.sh"
echo ""
echo -e "${YELLOW}To connect via SSH:${NC}"
echo -e "  ssh -i $HOME/.ssh/$KEY_NAME.pem ubuntu@$PUBLIC_IP"
echo ""
