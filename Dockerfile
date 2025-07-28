FROM oven/bun:1.2.15 as base

# Set working directory
WORKDIR /app

# Copy package.json files for all workspaces
COPY package.json bun.lock ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the server application
RUN bun run build --filter server

# Expose ports for API and WebSocket servers
EXPOSE 3000 4000

# Set environment variables
ENV NODE_ENV=production

# Use a non-root user for better security
USER bun

# Set the working directory to the server app
WORKDIR /app/apps/server

# Start the server
CMD ["bun", "run", "start"]