FROM node:10.1-alpine

RUN apk add --no-cache \
ffmpeg=3.4-r1 \
git=2.15.3-r0 \
python2=2.7.15-r2 \
make=4.2.1-r0 \
g++=6.4.0-r5

WORKDIR /usr/app
COPY package*.json ./

RUN npm install

COPY . /usr/app 
COPY Dockerfile /

CMD ["npm", "start"]
