# SSL Certificates

This directory should contain SSL certificates for HTTPS.

## For Production

Use Let's Encrypt or purchase certificates from a CA.

## For Development/Testing

Generate self-signed certificates:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem -out cert.pem \
  -subj "/C=US/ST=State/L=City/O=LaChispa/CN=app.lachispa.me"
```

Or use the included script:

```bash
./generate-certs.sh
```

## Files Required

- `cert.pem` - SSL certificate
- `key.pem` - Private key
