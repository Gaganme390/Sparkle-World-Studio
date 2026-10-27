# ==============================================================================
# Multi-Stage Dockerfile for GD Goenka Ayodhya School
# Production Node.js + Express + Vite + PostgreSQL Client
# ==============================================================================

# Stage 1: Build the Vite Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies required for Vite build)
RUN npm ci

# Copy full application source code
COPY . .

# Build the optimized production bundle into /app/dist
RUN npm run build

# ==============================================================================
# Stage 2: Lightweight Production Container
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy backend server files
COPY server/ ./server/

# Copy built frontend assets from builder stage
COPY --from=builder /app/dist ./dist

# Create unprivileged user for secure container execution
RUN addgroup -S goenka && adduser -S goenka -G goenka \
    && chown -R goenka:goenka /app

USER goenka

EXPOSE 5000

# Health check to ensure the backend and web server are responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start the Node.js production server
CMD ["node", "server/index.js"]
