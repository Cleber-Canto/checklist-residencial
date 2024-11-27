# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the project files
COPY . .

# Expose the app port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
