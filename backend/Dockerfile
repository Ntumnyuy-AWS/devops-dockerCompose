
# Use Node.js 22 as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy the remaining backend source code
COPY . .

# Create the uploads directory
RUN mkdir -p uploads

# Document the application port
EXPOSE 3000

# Start the backend application
CMD ["npm", "start"]
