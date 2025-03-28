FROM node:20-slim

# Set working directory
WORKDIR /usr/

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    make \
    g++ \
    python3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
# COPY tsconfig.json ./

# Install dependencies
RUN npm ci && npm rebuild bcrypt --build-from-source

EXPOSE 3000

# delete dist folder
RUN rm -rf dist

# Copy source code
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]