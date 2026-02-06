#!/bin/bash

# Setup script for The Great Bulls MVP environment
# Run this script to set up .env.local and get required API keys

set -e  # Exit on any error

echo "🚀 Setting up environment for The Great Bulls..."

# Step 1: Backup existing .env.local if it exists
if [ -f ".env.local" ]; then
    echo "📁 Backing up existing .env.local to .env.local.backup"
    mv .env.local .env.local.backup
fi

# Step 2: Generate secure NEXTAUTH_SECRET
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo "🔐 Generated NEXTAUTH_SECRET"

# Step 3: Create .env.local
cat > .env.local << EOF
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXTAUTH_URL=http://localhost:3000
# DATABASE_URL=   ← Fill this after MongoDB Atlas setup
# ALPHA_VANTAGE_API_KEY=   ← Fill this after Alpha Vantage signup
EOF

echo "📝 Created .env.local with generated secrets"

# Step 4: Open browser tabs for signups
echo "🌐 Opening browser tabs for required signups..."
xdg-open "https://www.mongodb.com/cloud/atlas/register" &
xdg-open "https://www.alphavantage.co/support/#api-key" &

# Step 5: Print clear instructions
echo ""
echo "📋 INSTRUCTIONS (Copy-paste ready):"
echo ""
echo "1. MongoDB Atlas (FREE cluster):"
echo "   - Sign up/login at the opened tab"
echo "   - Create FREE cluster (M0 Sandbox)"
echo "   - Go to Database Access → Add user (read/write)"
echo "   - Go to Network Access → Add IP (0.0.0.0/0 for dev)"
echo "   - Go to Clusters → Connect → Connect your application"
echo "   - Choose 'Node.js' driver → Copy the connection string"
echo "   - Paste it into .env.local as: DATABASE_URL=\"mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority\""
echo ""
echo "2. Alpha Vantage (FREE API key):"
echo "   - Sign up at the opened tab"
echo "   - Submit the form to get your FREE API key"
echo "   - Copy the key and paste into .env.local as: ALPHA_VANTAGE_API_KEY=\"your-key-here\""
echo ""
echo "3. After filling both values, run:"
echo "   source .env.local"
echo "   npx prisma db push"
echo "   npm run dev"
echo ""
echo "✅ Environment setup complete! Follow the instructions above."

# Optional AWS DocumentDB block (commented)
echo ""
echo "# OPTIONAL: If you prefer AWS DocumentDB instead of MongoDB Atlas,"
echo "# uncomment and run these AWS CLI commands (requires AWS CLI configured):"
echo "#"
echo "# aws docdb create-db-cluster \\"
echo "#   --db-cluster-identifier thegreatbulls-cluster \\"
echo "#   --engine docdb \\"
echo "#   --master-username admin \\"
echo "#   --master-user-password YourSecurePassword123 \\"
echo "#   --vpc-security-group-ids sg-xxxxxxxx \\"
echo "#   --db-subnet-group-name your-subnet-group"
echo "#"
echo "# aws docdb create-db-instance \\"
echo "#   --db-instance-identifier thegreatbulls-instance \\"
echo "#   --db-instance-class db.t3.medium \\"
echo "#   --db-cluster-identifier thegreatbulls-cluster"
echo "#"
echo "# Then get the connection string from AWS console and use as DATABASE_URL."
echo "# Note: DocumentDB is compatible with MongoDB drivers."