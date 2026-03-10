#!/bin/bash
# Generate self-signed SSL certificates for development

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem -out cert.pem \
  -subj "/C=US/ST=State/L=City/O=LaChispa/CN=app.lachispa.me"

echo "Certificates generated: cert.pem and key.pem"
