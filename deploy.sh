#!/bin/bash
# deploy.sh — Deploy/update Pulefeed on Hostinger VPS (PM2 + Nginx + Docker DB 5437)
set -e

echo "🚀 Deploying Pulefeed (PM2 + Nginx)..."

# Pull latest code
git fetch origin main && git reset --hard origin/main

# Install dependencies
npm ci --ignore-scripts

# Build Next.js & Payload
echo "🔨 Building Next.js & Payload application..."
npm run build

# Reload PM2 zero-downtime
echo "♻️  Reloading PM2 application..."
pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
pm2 save

# Warm the cache on startup
echo "🔥 Warming cache..."
sleep 3
curl -s -o /dev/null http://127.0.0.1:3000/ || true
sleep 1
curl -s -o /dev/null http://127.0.0.1:3000/ || true

echo "✅ Deployment complete!"
pm2 status
