# Pakai Node 20
FROM node:20-alpine

RUN npm install -g next

WORKDIR /app

# Copy hanya file package dulu
COPY package.json package-lock.json ./

# Install dependencies
RUN npm config set ignore-scripts true
RUN npm install --legacy-peer-deps
RUN npm config set ignore-scripts false

# Setelah install, baru copy semua source code
COPY . .

RUN npm install

# Build Next.js
RUN npm run build

CMD ["npm", "run", "start"]
