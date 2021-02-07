FROM node:alpine

WORKDIR /mail-notification-api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]