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

COPY . /usr/app 

RUN npm install

COPY Dockerfile /

## production build start
FROM node:12.18-alpine3.12 AS ProdBuild

RUN apk update \ 
    && apk upgrade \
    && apk add --no-cache \
    ffmpeg

WORKDIR /usr/app

COPY --from=DevBuild /usr/app .
 
# comment out switch to entrypoint for dev
CMD ["npm", "start"]

# ENTRYPOINT [ "/bin/bash" ]
