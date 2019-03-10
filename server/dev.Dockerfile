# Base Image
FROM node:10.15.0-alpine

# Working Directory
WORKDIR /app

# Copy Files and Install Dependencies
COPY ./package.json ./
RUN yarn install

# Volumes will do the Job
# COPY ./ ./

# Start Server
CMD ["yarn", "run", "dev"]