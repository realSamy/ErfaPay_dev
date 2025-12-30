FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . /app/

# Build the Nuxt app for production
RUN npm run build

# Expose the port (Nuxt default is 3000)
EXPOSE 3000

# Start the Nuxt server in production mode
CMD ["npm", "start"]