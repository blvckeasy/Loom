# Use official Node.js LTS image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on (adjust if needed)
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
