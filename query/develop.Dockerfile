FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./query/package.json /app

RUN npm install

COPY ./query/ /app

CMD ["node", "index.js"]