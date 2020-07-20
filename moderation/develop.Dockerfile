FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./moderation/package.json /app

RUN npm install

COPY ./moderation/ /app

CMD ["node", "index.js"]