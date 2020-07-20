FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./posts/package.json /app

RUN npm install

COPY ./posts/ /app

CMD ["node", "index.js"]