# Production stage
FROM nginx:alpine

# Create non-privileged user
RUN addgroup -g 1000 -S appuser && \
    adduser -u 1000 -S appuser -G appuser

# Create required directories with proper permissions
RUN mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/proxy && \
    chown -R appuser:appuser /var/cache/nginx

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/

# Copy static files from public/ directory
COPY --chown=appuser:appuser public/ /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html

USER appuser

# Expose port
EXPOSE 80

# Start nginx (runs as root, serves files owned by userapp)
CMD ["nginx", "-g", "daemon off;"]
