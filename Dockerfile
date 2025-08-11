FROM php:8.2-cli
# Install basic deps
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Copy project files
COPY ./index.php ./
COPY ./templates/ ./templates/
COPY ./static/ ./static/

EXPOSE 8080
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} index.php"]
