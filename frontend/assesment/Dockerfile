# === Stage 1: Build the React app ===
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy all frontend source
COPY . .

# Build the production bundle
RUN npm run build

# === Stage 2: Serve with NGINX ===
FROM nginx:alpine

# Copy the compiled build output from Stage 1
# Create React App builds into "build" by default
COPY --from=build /app/build /usr/share/nginx/html

# Expose NGINX's default port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
