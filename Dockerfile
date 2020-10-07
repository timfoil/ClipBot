## Dev container without the bot's code or node_modules
FROM node:12.18-alpine3.12 AS DevBuild
 
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
FROM DevBuild AS DebugBuild

WORKDIR /usr/app

COPY . . 

RUN npm install

COPY Dockerfile /

# uncomment during development
# CMD [ "/bin/bash" ]


### production build start
FROM node:12.18-alpine3.12 AS ProdBuild

RUN apk update \ 
    && apk upgrade \
    && apk add --no-cache \
    ffmpeg

WORKDIR /usr/app

COPY --from=DebugBuild /usr/app .

RUN npm prune --production

CMD ["npm", "start"]
