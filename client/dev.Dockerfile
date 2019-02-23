FROM node:10.15.0-alpine

WORKDIR /anotherapp

COPY ./package.json ./
RUN yarn install

# COPY ./ ./

CMD ["yarn", "run", "dev"]