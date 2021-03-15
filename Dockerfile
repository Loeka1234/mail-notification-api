FROM node:alpine

WORKDIR /mail-notification-api

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]