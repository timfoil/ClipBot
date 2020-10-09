## Dev container without the bot's code or node_modules
FROM node:12.18-alpine3.12 AS dev-build
 
RUN apk update \ 
    && apk upgrade \
    && apk add --no-cache \
    bash \ 
    python3 \
    build-base \
    git \
    libtool \
    autoconf \
    automake \
    vim \
    ffmpeg \
    openssh \
    && ln -sf python3 /usr/bin/python

## Dev container with bot's code and node_modules 
FROM dev-build AS base-build

WORKDIR /usr/app

COPY . . 

RUN npm install

COPY Dockerfile /

### production builds start ###

## Include sounds in image
FROM node:12.18-alpine3.12 AS clip-bot-sounds

RUN apk update \ 
    && apk upgrade \
    && apk add --no-cache \
    ffmpeg

WORKDIR /usr/app

COPY --from=base-build /usr/app .

RUN npm prune --production

CMD ["npm", "start"]

## No sounds in image
FROM clip-bot-sounds AS clip-bot

# remove sound folder if it exists
RUN rm -rf sounds
