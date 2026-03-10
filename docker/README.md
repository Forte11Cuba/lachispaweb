# Docker Configuration

This directory contains all Docker-related configuration files for deploying LaChispa.

## Files

| File | Description |
|------|-------------|
| `Dockerfile` | Production Docker image (Nginx) |
| `Dockerfile.dev` | Development Docker image with live reload |
| `docker-compose.yml` | Docker Compose configuration with profiles |
| `docker-compose.prod.yml` | Legacy production override (use profiles instead) |
| `nginx.conf` | Nginx configuration for production |
| `nginx-dev.conf` | Nginx configuration for development |
| `nginx-ssl.conf` | Nginx configuration with SSL |
| `ssl/` | SSL certificates directory (generate with `generate-certs.sh`) |

## Static Assets

All static files (HTML, CSS, JS, images) must be placed in the `public/` directory at the project root. This directory is copied into the Docker image during build.

## Usage

### Using Docker Compose Profiles

```bash
# Development live reload (port with 8080)
docker compose --profile dev up dev

# Production HTTP only (port 80)
docker compose --profile production up web

# Production HTTPS (port 443) - requires SSL certificates
docker compose --profile production up production

# Run in background
docker compose --profile production up -d production

# Stop all services
docker compose down
```

### Quick Start

```bash
# Start development server
docker compose --profile dev up dev

# Start production server (HTTP)
docker compose --profile production up web
```

## Profiles

| Profile | Service | Port | Description |
|---------|---------|------|-------------|
| `dev` | dev | 8080 | Development with live reload |
| `production` | web | 80 | Production HTTP server |
| `production` | production | 443 | Production HTTPS (requires SSL) |

## SSL Certificates

For HTTPS support, generate self-signed certificates for development:

```bash
cd ssl
chmod +x generate-certs.sh
./generate-certs.sh
```

For production, use certificates from Let's Encrypt or a CA.

## User

The containers run as a non-privileged user (`appuser` with UID/GID 1000) for security.
