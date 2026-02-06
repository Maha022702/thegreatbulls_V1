#!/bin/bash

# Automated Full Deployment with MongoDB on EC2
# This deploys everything without needing MongoDB Atlas

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║    AUTOMATED AWS DEPLOYMENT - The Great Bulls            ║"
echo "║    MongoDB will be installed on EC2                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Configuration
INSTANCE_NAME="thegreatbulls-production"
INSTANCE_TYPE="t3.medium"
AMI_ID="ami-0c7217cdde317cfec"  # Ubuntu 22.04 LTS in us-east-1
KEY_NAME="thegreatbulls-key"
SECURITY_GROUP_NAME="thegreatbulls-sg"
REGION="us-east-1"

echo -e "${YELLOW}Step 1: Creating EC2 Key Pair...${NC}"
if [ ! -f "$HOME/.ssh/$KEY_NAME.pem" ]; then
    aws ec2 create-key-pair \
        --key-name $KEY_NAME \
        --query 'KeyMaterial' \
        --output text \
        --region $REGION > "$HOME/.ssh/$KEY_NAME.pem"
    chmod 400 "$HOME/.ssh/$KEY_NAME.pem"
    echo -e "${GREEN}✅ Key pair created${NC}"
else
    echo -e "${YELLOW}Key pair already exists${NC}"
fi

echo -e "${YELLOW}Step 2: Creating Security Group...${NC}"
SG_ID=$(aws ec2 describe-security-groups \
    --filters "Name=group-name,Values=$SECURITY_GROUP_NAME" \
    --query 'SecurityGroups[0].GroupId' \
    --output text \
    --region $REGION 2>/dev/null || echo "None")

if [ "$SG_ID" == "None" ]; then
    SG_ID=$(aws ec2 create-security-group \
        --group-name $SECURITY_GROUP_NAME \
        --description "Security group for The Great Bulls" \
        --region $REGION \
        --query 'GroupId' \
        --output text)
    
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr 0.0.0.0/0 --region $REGION
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 80 --cidr 0.0.0.0/0 --region $REGION
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 443 --cidr 0.0.0.0/0 --region $REGION
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 3000 --cidr 0.0.0.0/0 --region $REGION
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 27017 --cidr 0.0.0.0/0 --region $REGION
    echo -e "${GREEN}✅ Security group created${NC}"
else
    echo -e "${YELLOW}Security group exists${NC}"
fi

echo -e "${YELLOW}Step 3: Launching EC2 Instance...${NC}"
INSTANCE_ID=$(aws ec2 run-instances \
    --image-id $AMI_ID \
    --instance-type $INSTANCE_TYPE \
    --key-name $KEY_NAME \
    --security-group-ids $SG_ID \
    --region $REGION \
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME}]" \
    --query 'Instances[0].InstanceId' \
    --output text)

echo -e "${GREEN}✅ Instance launched: $INSTANCE_ID${NC}"
echo -e "${YELLOW}Waiting for instance to be running...${NC}"

aws ec2 wait instance-running --instance-ids $INSTANCE_ID --region $REGION

PUBLIC_IP=$(aws ec2 describe-instances \
    --instance-ids $INSTANCE_ID \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text \
    --region $REGION)

echo -e "${GREEN}✅ Instance running at: $PUBLIC_IP${NC}"
echo -e "${YELLOW}Waiting 30 seconds for SSH to be ready...${NC}"
sleep 30

# Generate NextAuth secret
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Create production env file
cat > .env.production << EOF
DATABASE_URL="mongodb://localhost:27017/thegreatbulls_production"
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
NEXTAUTH_URL="http://$PUBLIC_IP:3000"
ALPHA_VANTAGE_API_KEY=6WR7RX2O5KUQ4EBE
NODE_ENV=production
PORT=3000
AWS_REGION=us-east-1
EOF

echo -e "${GREEN}✅ Environment configured${NC}"

echo -e "${YELLOW}Step 4: Setting up server and deploying...${NC}"

# Build locally first
echo "Building application locally..."
npm run build

# Deploy to EC2
ssh -o StrictHostKeyChecking=no -i "$HOME/.ssh/$KEY_NAME.pem" ubuntu@$PUBLIC_IP << 'ENDSSH'
    set -e
    
    echo "Installing system packages..."
    sudo apt-get update -qq
    sudo apt-get install -y gnupg curl
    
    echo "Installing MongoDB..."
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    sudo apt-get update -qq
    sudo apt-get install -y mongodb-org
    
    echo "Starting MongoDB..."
    sudo systemctl start mongod
    sudo systemctl enable mongod
    
    echo "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    echo "Installing PM2..."
    sudo npm install -g pm2
    
    echo "Creating application directory..."
    mkdir -p /home/ubuntu/thegreatbulls
    mkdir -p /home/ubuntu/thegreatbulls/logs
ENDSSH

echo "Uploading application files..."
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next' --exclude 'db-backup*' \
    -e "ssh -o StrictHostKeyChecking=no -i $HOME/.ssh/$KEY_NAME.pem" \
    ./ ubuntu@$PUBLIC_IP:/home/ubuntu/thegreatbulls/

echo "Installing dependencies and starting application..."
ssh -o StrictHostKeyChecking=no -i "$HOME/.ssh/$KEY_NAME.pem" ubuntu@$PUBLIC_IP << ENDSSH
    cd /home/ubuntu/thegreatbulls
    
    echo "Installing dependencies..."
    npm ci --production
    
    echo "Generating Prisma Client..."
    npx prisma generate
    
    echo "Pushing database schema..."
    npx prisma db push
    
    echo "Building application..."
    npm run build
    
    echo "Starting with PM2..."
    pm2 delete thegreatbulls 2>/dev/null || true
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup | grep -v "PM2" | bash || true
    
    echo "Application started!"
    pm2 status
ENDSSH

echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║           🎉 DEPLOYMENT SUCCESSFUL! 🎉                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo -e "${YELLOW}Your application is now live at:${NC}"
echo -e "${GREEN}➜  http://$PUBLIC_IP:3000${NC}"
echo ""
echo -e "${YELLOW}Instance Details:${NC}"
echo "  Instance ID: $INSTANCE_ID"
echo "  Public IP: $PUBLIC_IP"
echo "  SSH: ssh -i ~/.ssh/$KEY_NAME.pem ubuntu@$PUBLIC_IP"
echo ""
echo -e "${YELLOW}Useful Commands:${NC}"
echo "  View logs: ssh -i ~/.ssh/$KEY_NAME.pem ubuntu@$PUBLIC_IP 'pm2 logs'"
echo "  Restart: ssh -i ~/.ssh/$KEY_NAME.pem ubuntu@$PUBLIC_IP 'pm2 restart thegreatbulls'"
echo "  Status: ssh -i ~/.ssh/$KEY_NAME.pem ubuntu@$PUBLIC_IP 'pm2 status'"
echo ""
echo -e "${BLUE}MongoDB is running locally on the EC2 instance${NC}"
echo -e "${BLUE}You can migrate to MongoDB Atlas later if needed${NC}"
echo ""
