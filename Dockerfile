# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first for caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --verbose

# Copy all source code
COPY . .

# Expose port used by Vite (default 5173)
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
