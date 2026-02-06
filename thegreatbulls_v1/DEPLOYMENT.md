# 🚀 AWS Production Deployment Guide for The Great Bulls

## Overview
This guide provides step-by-step instructions for deploying The Great Bulls Next.js application to AWS for production use.

## Architecture
- **Frontend/Backend**: Next.js (deployed on AWS EC2)
- **Database**: MongoDB Atlas (managed cloud database)
- **Process Manager**: PM2 (for zero-downtime deployments)
- **Reverse Proxy**: Nginx (optional, for SSL/domain)

## Prerequisites
✅ AWS CLI installed and configured (already done)
✅ AWS credentials configured
✅ MongoDB Atlas account (we'll set this up)

---

## 📋 Deployment Steps

### Step 1: Set Up MongoDB Atlas (Production Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for a free account

2. **Create a New Cluster**
   - Click "Build a Database"
   - Select "M0 Free" tier (or paid tier for production)
   - Choose **AWS** as cloud provider
   - Region: **us-east-1** (same as your EC2)
   - Cluster name: `thegreatbulls-production`

3. **Configure Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `thegreatbulls_admin`
   - Password: Generate a strong password (save this!)
   - Role: "Atlas admin" or "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, you can restrict this to your EC2 IP later

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Driver: Node.js, Version: 5.5 or later
   - Copy the connection string
   - It looks like: `mongodb+srv://thegreatbulls_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update .env.production**
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://thegreatbulls_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/thegreatbulls_production?retryWrites=true&w=majority`

### Step 2: Migrate Your Local Data to MongoDB Atlas (Optional)

If you want to copy your existing local data to production:

```bash
# Export local data
mongodump --uri="mongodb://localhost:27018/thegreatbulls" --out=./db-backup

# Import to Atlas
mongorestore --uri="mongodb+srv://thegreatbulls_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/thegreatbulls_production" ./db-backup/thegreatbulls
```

### Step 3: Update Production Environment Variables

Edit `.env.production` file:

```bash
# Update these values:
DATABASE_URL="mongodb+srv://thegreatbulls_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/thegreatbulls_production?retryWrites=true&w=majority"
NEXTAUTH_SECRET="YOUR_NEW_SECRET_HERE"  # Generate: openssl rand -base64 32
NEXTAUTH_URL="http://YOUR_EC2_IP:3000"  # Will update after EC2 setup
```

Generate a new NextAuth secret:
```bash
openssl rand -base64 32
```

### Step 4: Create EC2 Instance

Run the automated setup script:

```bash
chmod +x setup-ec2.sh
./setup-ec2.sh
```

This script will:
- ✅ Create an EC2 key pair
- ✅ Create a security group with required ports (22, 80, 443, 3000)
- ✅ Launch a t3.medium EC2 instance (2 vCPUs, 4GB RAM)
- ✅ Display the public IP address

**Note the Public IP** - you'll need this for the next steps!

### Step 5: Update Deployment Configuration

1. **Update deploy-to-ec2.sh**
   ```bash
   # Edit line 13
   EC2_HOST="YOUR_EC2_PUBLIC_IP"
   ```

2. **Update .env.production**
   ```bash
   # Edit NEXTAUTH_URL
   NEXTAUTH_URL="http://YOUR_EC2_PUBLIC_IP:3000"
   ```

### Step 6: Deploy Application to EC2

Run the deployment script:

```bash
chmod +x deploy-to-ec2.sh
./deploy-to-ec2.sh
```

This script will:
- ✅ Build your application locally
- ✅ Connect to EC2 instance
- ✅ Install Node.js and PM2
- ✅ Upload application files
- ✅ Install dependencies
- ✅ Generate Prisma Client
- ✅ Build Next.js application
- ✅ Start application with PM2

### Step 7: Verify Deployment

1. **Check Application Status**
   ```bash
   ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP
   pm2 status
   pm2 logs thegreatbulls
   ```

2. **Access Your Application**
   - Open browser: `http://YOUR_EC2_IP:3000`
   - Test login and course management features

### Step 8: Initialize Database (First Time Only)

If this is your first deployment, seed the admin user:

```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP
cd /home/ubuntu/thegreatbulls
npx prisma db push
node scripts/seed.ts
```

---

## 🔧 Post-Deployment Configuration

### Install Nginx (Optional - for Production Domain)

Once you have a domain, you can set up Nginx as a reverse proxy:

```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP

# Install Nginx
sudo apt update
sudo apt install nginx -y

# Configure Nginx
sudo nano /etc/nginx/sites-available/thegreatbulls

# Add this configuration:
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/thegreatbulls /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Install SSL Certificate (Free with Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🔄 Updating Your Application

To deploy updates:

```bash
# Make your code changes locally
# Test them
# Then deploy:
./deploy-to-ec2.sh
```

PM2 will automatically restart the application with zero downtime.

---

## 📊 Monitoring

### View Application Logs
```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP
pm2 logs thegreatbulls
```

### Monitor Performance
```bash
pm2 monit
```

### Check Application Status
```bash
pm2 status
```

---

## 🔒 Security Best Practices

1. **Change Default Passwords**
   - Update MongoDB Atlas user password
   - Create a strong admin password for your app

2. **Restrict MongoDB Network Access**
   - In MongoDB Atlas, update network access to only allow your EC2 IP

3. **Enable Firewall**
   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

4. **Regular Updates**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

## 🚨 Troubleshooting

### Application Won't Start
```bash
# Check PM2 logs
pm2 logs thegreatbulls --lines 100

# Check error logs
cat /home/ubuntu/thegreatbulls/logs/err.log
```

### Database Connection Issues
- Verify MongoDB Atlas connection string
- Check if IP whitelist includes 0.0.0.0/0 or your EC2 IP
- Test connection: `node -e "require('mongodb').MongoClient.connect('YOUR_CONNECTION_STRING', (e,c) => { console.log(e || 'Connected!'); process.exit(); })"`

### Permission Issues
```bash
# Fix file permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu/thegreatbulls
```

---

## 💰 Cost Estimate

- **EC2 t3.medium**: ~$30/month (can use t3.small for ~$15/month)
- **MongoDB Atlas M0**: FREE (512MB storage, shared cluster)
- **Data Transfer**: Minimal for typical usage

**Total**: ~$15-30/month (or FREE if you use MongoDB Atlas M0 + AWS Free Tier EC2)

---

## 📞 Support

For issues:
1. Check PM2 logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify environment variables are set correctly

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] Network access configured (0.0.0.0/0 or specific IPs)
- [ ] Connection string copied and updated in .env.production
- [ ] EC2 instance created (setup-ec2.sh)
- [ ] EC2_HOST updated in deploy-to-ec2.sh
- [ ] NEXTAUTH_URL updated in .env.production
- [ ] Application deployed (deploy-to-ec2.sh)
- [ ] Database seeded (if first deployment)
- [ ] Application accessible at http://EC2_IP:3000
- [ ] Admin login working
- [ ] Course creation/editing working
- [ ] (Optional) Domain configured with Nginx
- [ ] (Optional) SSL certificate installed

---

## 🎉 Success!

Your application is now live on AWS! You can access it at:
**http://YOUR_EC2_IP:3000**

Once you configure a domain, it will be:
**https://yourdomain.com**
