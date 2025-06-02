FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment PORT to 80 explicitly (optional for local)
ENV PORT=80

# Your app must use process.env.PORT, not hardcoded 3000
EXPOSE 80

CMD ["npm", "start"]
