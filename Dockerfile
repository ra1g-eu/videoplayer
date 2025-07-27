# Use Node.js LTS version
FROM node:22-alpine

# Install ffmpeg for video processing
RUN apk add --no-cache ffmpeg

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Create necessary directories
RUN mkdir -p /app/videos /app/public/thumbnails

# Expose port
EXPOSE 3020

# Start the application
CMD ["npm", "start"]