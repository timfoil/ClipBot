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
    && ln -sf python3 /usr/bin/python

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

COPY --from=DevBuild /usr/app .
 
CMD ["npm", "start"]
