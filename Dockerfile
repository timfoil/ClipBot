FROM node:10.1-alpine

RUN apk add --no-cache ffmpeg git python make g++

WORKDIR /usr/app
COPY package*.json ./

RUN npm install

COPY . /usr/app 
COPY Dockerfile /

CMD ["npm", "start"]
