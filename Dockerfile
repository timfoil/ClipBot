FROM node:12.18-alpine3.12

RUN apk update \ 
    && apk upgrade \
    && apk add --no-cache bash \
    python3 \
    build-base \
    git \
    libtool \
    autoconf \
    automake \
    && ln -sf python3 /usr/bin/python


WORKDIR /usr/app
COPY package*.json ./

RUN npm install

COPY . /usr/app 
COPY Dockerfile /

## leave commented until we update our src to work with newer discord.js release
# CMD ["npm", "start"]

ENTRYPOINT [ "/bin/bash" ]
