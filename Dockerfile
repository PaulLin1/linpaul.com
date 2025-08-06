# Build stage
FROM rust:1.82 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim
# Install runtime dependencies if needed
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
# Copy the binary from builder stage
COPY --from=builder /app/target/release/linpaul .

# Copy your templates and static files
COPY templates/ ./templates/
COPY static/ ./static/

CMD ["./linpaul"]
