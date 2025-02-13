# Dockerfile (for dev)
FROM node:18-alpine

WORKDIR /app

# Copy just package.json / package-lock to install deps (layer caching)
COPY package*.json ./
RUN npm install

# Copy all source
COPY . .

EXPOSE 8000

# For local development:
# - We'll run `npm run dev` to use nodemon
# - We'll likely mount our src as a volume to get live reload
CMD ["npm", "run", "dev"]
