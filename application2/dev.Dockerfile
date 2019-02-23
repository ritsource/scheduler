FROM node:10.15.0-alpine

WORKDIR /app

COPY ./package.json ./
RUN yarn install

# COPY ./ ./

CMD ["yarn", "run", "dev"]