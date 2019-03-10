# Base Image
FROM node:10.15.0-alpine

# Working Directory
WORKDIR /app

# Copy Files and Install Dependencies
COPY ./package.json ./
RUN yarn install
COPY ./ ./

# Build Production Bundles
RUN yarn run build

# Start Server
CMD ["yarn", "run", "start"]