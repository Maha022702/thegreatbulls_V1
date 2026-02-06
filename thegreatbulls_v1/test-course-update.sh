#!/bin/bash

# Test Course Update Flow
# This script tests if course data persists properly in the database

echo "=== Course Update Test ==="
echo ""

# 1. Get first course
echo "1. Fetching courses..."
COURSE_DATA=$(curl -s http://localhost:3000/api/courses)
COURSE_ID=$(echo "$COURSE_DATA" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$COURSE_ID" ]; then
  echo "❌ No courses found in database"
  exit 1
fi

echo "✅ Found course ID: $COURSE_ID"
echo ""

# 2. Get current course data
echo "2. Getting current course data..."
BEFORE=$(curl -s "http://localhost:3000/api/courses/$COURSE_ID")
echo "Current title: $(echo "$BEFORE" | grep -o '"title":"[^"]*"' | cut -d'"' -f4)"
echo "Current language: $(echo "$BEFORE" | grep -o '"language":"[^"]*"' | cut -d'"' -f4)"
echo "Current status: $(echo "$BEFORE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)"
echo ""

# 3. Update the course
echo "3. Updating course..."
UPDATE_PAYLOAD='{
  "title": "Test Course Updated",
  "description": "This is a test update from script",
  "price": 25000,
  "category": "Advanced Trading",
  "level": "ADVANCED",
  "language": "Hindi",
  "duration": 2400,
  "visibility": "PUBLIC",
  "status": "PUBLISHED",
  "isPublished": true,
  "subtitle": "Test subtitle",
  "shortDescription": "Test short description"
}'

UPDATE_RESPONSE=$(curl -s -X PUT \
  -H "Content-Type: application/json" \
  -d "$UPDATE_PAYLOAD" \
  "http://localhost:3000/api/courses/$COURSE_ID")

if echo "$UPDATE_RESPONSE" | grep -q "error"; then
  echo "❌ Update failed:"
  echo "$UPDATE_RESPONSE"
  exit 1
fi

echo "✅ Update successful"
echo ""

# 4. Verify the update
echo "4. Verifying update persisted..."
sleep 1
AFTER=$(curl -s "http://localhost:3000/api/courses/$COURSE_ID")

NEW_TITLE=$(echo "$AFTER" | grep -o '"title":"[^"]*"' | cut -d'"' -f4)
NEW_LANGUAGE=$(echo "$AFTER" | grep -o '"language":"[^"]*"' | cut -d'"' -f4)
NEW_STATUS=$(echo "$AFTER" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
NEW_PRICE=$(echo "$AFTER" | grep -o '"price":[0-9]*' | grep -o '[0-9]*')

echo "New title: $NEW_TITLE"
echo "New language: $NEW_LANGUAGE"
echo "New status: $NEW_STATUS"
echo "New price: $NEW_PRICE"
echo ""

# 5. Verify all fields updated
echo "5. Verification Results:"
if [ "$NEW_TITLE" = "Test Course Updated" ]; then
  echo "✅ Title updated correctly"
else
  echo "❌ Title NOT updated (got: $NEW_TITLE)"
fi

if [ "$NEW_LANGUAGE" = "Hindi" ]; then
  echo "✅ Language updated correctly"
else
  echo "❌ Language NOT updated (got: $NEW_LANGUAGE)"
fi

if [ "$NEW_STATUS" = "PUBLISHED" ]; then
  echo "✅ Status updated correctly"
else
  echo "❌ Status NOT updated (got: $NEW_STATUS)"
fi

if [ "$NEW_PRICE" = "25000" ]; then
  echo "✅ Price updated correctly"
else
  echo "❌ Price NOT updated (got: $NEW_PRICE)"
fi

echo ""
echo "=== Test Complete ==="
