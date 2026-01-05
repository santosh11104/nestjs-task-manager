# ---------- Build Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build



# ---------- Runtime Stage ----------
FROM node:18-alpine

WORKDIR /app

ENV NODE_OPTIONS=--experimental-global-webcrypto

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]

