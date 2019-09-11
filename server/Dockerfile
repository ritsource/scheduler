# Base Image
FROM node:10.15.0-alpine

# Working Directory
WORKDIR /app

# Copy Files and Install Dependencies
COPY ./package.json ./
RUN yarn install
COPY ./ ./

# PORT environment variable for Google-Cloud-Runhosting
ENV PORT 5000

# Start Server
CMD ["yarn", "run", "start"]