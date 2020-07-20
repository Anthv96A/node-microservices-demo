FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./event-bus/package.json /app

RUN npm install

COPY ./event-bus/ /app

CMD ["node", "index.js"]