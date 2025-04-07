FROM node:18-alpine

WORKDIR /app

# Install netcat for MongoDB connection check
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

# Make entrypoint script executable
RUN chmod +x docker-entrypoint.sh

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["npm", "start"]