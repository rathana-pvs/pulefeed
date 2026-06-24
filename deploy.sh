#!/bin/bash
# deploy.sh — Run this on your DigitalOcean Droplet to deploy/update Pulefeed
# Usage: bash deploy.sh
set -e

echo "🚀 Deploying Pulefeed..."

# Pull latest code
git pull origin main

# Build the new image
echo "🔨 Building Docker image..."
docker compose -f docker-compose.prod.yml build app

# Restart app with zero-downtime (DB stays up)
echo "♻️  Restarting app container..."
docker compose -f docker-compose.prod.yml up -d --no-deps app

# Remove dangling images to save disk space
docker image prune -f

echo "✅ Deployment complete!"
echo "📋 Logs: docker compose -f docker-compose.prod.yml logs -f app"
