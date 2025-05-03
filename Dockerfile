# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install nodemon globally + dependencies
RUN npm install -g nodemon && npm install

# Copy the rest of the code
COPY . .

RUN npx prisma generate

# Expose port
EXPOSE 6969

# Start the application
CMD ["npm", "run", "dev"]
