#!/bin/bash

# Database Migration Script - Migrate local MongoDB to Atlas

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}MongoDB Data Migration Tool${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if mongodump is installed
if ! command -v mongodump &> /dev/null; then
    echo -e "${YELLOW}MongoDB Database Tools not found. Installing...${NC}"
    echo "Please install MongoDB Database Tools from:"
    echo "https://www.mongodb.com/try/download/database-tools"
    exit 1
fi

# Local MongoDB settings
LOCAL_URI="mongodb://localhost:27018/thegreatbulls"
BACKUP_DIR="./db-backup-$(date +%Y%m%d-%H%M%S)"

echo "This script will:"
echo "  1. Export your local MongoDB data"
echo "  2. Upload it to MongoDB Atlas"
echo ""

read -p "Enter your MongoDB Atlas connection string: " ATLAS_URI

if [ -z "$ATLAS_URI" ]; then
    echo -e "${RED}❌ MongoDB Atlas URI is required${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 1: Exporting local database...${NC}"
mongodump --uri="$LOCAL_URI" --out="$BACKUP_DIR"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Local database exported to $BACKUP_DIR${NC}"
else
    echo -e "${RED}❌ Failed to export local database${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 2: Importing to MongoDB Atlas...${NC}"
mongorestore --uri="$ATLAS_URI" "$BACKUP_DIR/thegreatbulls"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Data successfully migrated to MongoDB Atlas!${NC}"
    echo ""
    echo -e "${YELLOW}Backup saved at: $BACKUP_DIR${NC}"
    echo "You can delete this backup after verifying the migration."
else
    echo -e "${RED}❌ Failed to import to MongoDB Atlas${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Migration complete!${NC}"
