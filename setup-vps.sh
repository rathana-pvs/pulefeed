#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Pulefeed Automated VPS Setup...${NC}"

# 1. Install Docker if not present
if ! [ -x "$(command -v docker)" ]; then
    echo "📦 Docker not found. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    echo -e "${GREEN}✓ Docker is already installed.${NC}"
fi

# 2. Check for .env file
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file is missing!${NC}"
    echo "Please copy your local .env file to the VPS root folder first."
    echo "Run this locally in a separate terminal tab:"
    echo -e "${GREEN}scp /home/rathana/Desktop/pulefeed/.env root@YOUR_VPS_IP:$(pwd)/.env${NC}"
    exit 1
fi
echo -e "${GREEN}✓ .env file found.${NC}"

# 3. Check for SSL Certificates
echo "🔒 Checking SSL Certificates..."
# Find any volume matching "certbot_certs" to make it directory-agnostic
VOLUME_NAME=$(docker volume ls -q | grep certbot_certs | head -n 1)

if [ -n "$VOLUME_NAME" ] && docker run --rm -v "$VOLUME_NAME":/etc/letsencrypt alpine ls /etc/letsencrypt/live/pulefeed.com/fullchain.pem >/dev/null 2>&1; then
    echo -e "${GREEN}✓ SSL Certificates already exist. Skipping certificate generation.${NC}"
else
    echo "⚠️ SSL Certificates not found. Initiating Let's Encrypt SSL Bootstrap..."

    # Fallback email for SSL registration
    EMAIL="admin@pulefeed.com"

    # Backup original nginx.conf
    cp nginx/nginx.conf nginx/nginx.conf.bak

    # Create temporary Nginx configuration for HTTP port 80 only (no SSL)
    cat << 'EOF' > nginx/nginx.conf
events {
    worker_processes auto;
    worker_connections 1024;
}
http {
    include /etc/nginx/mime.types;
    server {
        listen 80;
        server_name pulefeed.com www.pulefeed.com;
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        location / {
            return 200 'SSL Bootstrapping...';
            add_header Content-Type text/plain;
        }
    }
}
EOF

    echo "🧱 Starting temporary Nginx server..."
    docker compose -f docker-compose.prod.yml up -d nginx

    echo "🔑 Requesting Let's Encrypt Certificate..."
    docker compose -f docker-compose.prod.yml run --rm certbot certonly \
      --webroot \
      -w /var/www/certbot \
      -d pulefeed.com \
      -d www.pulefeed.com \
      --email "$EMAIL" \
      --agree-tos \
      --no-eff-email

    echo "🛑 Stopping temporary Nginx server..."
    docker compose -f docker-compose.prod.yml down nginx

    echo "♻️ Restoring production Nginx configuration..."
    mv nginx/nginx.conf.bak nginx/nginx.conf
fi

# 4. Start all services in production mode
echo "⚡ Starting all services..."
docker compose -f docker-compose.prod.yml up -d db app nginx

echo -e "${GREEN}✅ Setup complete! Pulefeed is now running at https://pulefeed.com${NC}"
