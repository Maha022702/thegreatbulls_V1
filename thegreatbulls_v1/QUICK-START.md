# 🚀 Quick Deployment Reference

## One-Command Deployment

```bash
./deploy-wizard.sh
```

This wizard will guide you through the entire deployment process.

---

## Manual Deployment Steps

### 1. Set Up MongoDB Atlas (5 minutes)
```bash
# Go to https://cloud.mongodb.com
# - Create account (free)
# - Create cluster (M0 Free tier, AWS, us-east-1)
# - Create database user
# - Whitelist IP: 0.0.0.0/0
# - Copy connection string
```

### 2. Migrate Your Data (Optional)
```bash
./migrate-database.sh
# Enter your Atlas connection string when prompted
```

### 3. Create EC2 Instance
```bash
./setup-ec2.sh
# Note the Public IP address displayed at the end
```

### 4. Configure Environment
```bash
# Edit .env.production
# Update:
# - DATABASE_URL with your MongoDB Atlas connection string
# - NEXTAUTH_URL with http://YOUR_EC2_IP:3000
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)

# Edit deploy-to-ec2.sh
# Update line 13: EC2_HOST="YOUR_EC2_IP"
```

### 5. Deploy Application
```bash
./deploy-to-ec2.sh
```

### 6. Access Your App
```
http://YOUR_EC2_IP:3000
```

---

## Useful Commands

### SSH into Server
```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP
```

### View Application Logs
```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP "pm2 logs thegreatbulls"
```

### Restart Application
```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP "pm2 restart thegreatbulls"
```

### Check Status
```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP "pm2 status"
```

### Update Application
```bash
./deploy-to-ec2.sh
```

---

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Local data migrated to Atlas (optional)
- [ ] EC2 instance created
- [ ] .env.production configured
- [ ] deploy-to-ec2.sh configured with EC2 IP
- [ ] Application deployed
- [ ] App accessible at http://EC2_IP:3000
- [ ] Admin login working
- [ ] Course CRUD operations working

---

## Next Steps After Deployment

### 1. Configure Domain (Optional)
- Point your domain A record to EC2 IP
- Update NEXTAUTH_URL in production
- Install Nginx and SSL (see DEPLOYMENT.md)

### 2. Set Up Monitoring
```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP
pm2 install pm2-logrotate  # Rotate logs automatically
pm2 set pm2-logrotate:max_size 10M
```

### 3. Enable Automatic Backups
- In MongoDB Atlas: Database → Backup tab → Enable Cloud Backup

---

## Cost Breakdown

| Service | Tier | Cost |
|---------|------|------|
| EC2 t3.medium | On-Demand | ~$30/month |
| MongoDB Atlas | M0 Free | FREE |
| Data Transfer | Standard | ~$1-5/month |
| **Total** | | **~$30-35/month** |

### Cost Optimization
- Use t3.small ($15/month) if traffic is low
- Use AWS Reserved Instances (save 40%)
- Consider AWS Free Tier (12 months free t2.micro)

---

## Troubleshooting

### Can't connect to MongoDB
```bash
# Test connection
node -e "const { MongoClient } = require('mongodb'); MongoClient.connect('YOUR_CONNECTION_STRING').then(() => console.log('✅ Connected!')).catch(e => console.error('❌', e))"
```

### Application won't start
```bash
ssh -i ~/.ssh/thegreatbulls-key.pem ubuntu@YOUR_EC2_IP
cd /home/ubuntu/thegreatbulls
pm2 logs --lines 100
```

### 502 Bad Gateway
```bash
# Check if app is running
pm2 status
# Restart if needed
pm2 restart thegreatbulls
```

---

## Support Resources

- **Full Documentation**: `DEPLOYMENT.md`
- **PM2 Docs**: https://pm2.keymetrics.io/
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **AWS EC2**: https://docs.aws.amazon.com/ec2/

---

## Security Reminders

1. ✅ Use strong passwords for MongoDB
2. ✅ Regularly update EC2 instance: `sudo apt update && sudo apt upgrade`
3. ✅ Enable 2FA on MongoDB Atlas
4. ✅ Restrict MongoDB network access to EC2 IP only (after testing)
5. ✅ Set up SSL certificate for production domain
6. ✅ Regularly backup your database

---

**Ready to deploy?** Run: `./deploy-wizard.sh`
