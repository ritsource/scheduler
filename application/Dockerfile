FROM node:10.15.0-alpine

WORKDIR /app

COPY ./package.json ./
RUN yarn install

COPY ./ ./

RUN yarn run build

CMD ["yarn", "run", "start"]