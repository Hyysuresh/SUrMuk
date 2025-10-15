FROM node:18-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

# Dependencies install karo
RUN npm install
COPY . .
# Create uploads dir
RUN mkdir -p /usr/src/app/uploads
ENV PORT=5001
EXPOSE 5001
CMD ["node", "server.js"]

