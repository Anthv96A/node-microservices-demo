FROM node:14-alpine

WORKDIR "/app"
ENV CI=true

COPY package*.json ./
RUN npm install
COPY ./ ./

EXPOSE 3000
CMD [ "npm", "start" ]
