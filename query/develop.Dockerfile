FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./ /app

CMD ["node", "index.js"]