FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./comments/package.json /app

RUN npm install

COPY ./comments/ /app

CMD ["node", "index.js"]