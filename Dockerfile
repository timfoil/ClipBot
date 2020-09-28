FROM node:12.18-alpine3.12

RUN apk update \ 
    && apk upgrade \
    && apk add --no-cache \
    # bash \ dev dependency
    python3 \
    build-base \
    git \
    libtool \
    autoconf \
    automake \
    ffmpeg \
    && ln -sf python3 /usr/bin/python


WORKDIR /usr/app
COPY package*.json ./

RUN npm install

COPY . /usr/app 
COPY Dockerfile /

 
# comment out switch to entrypoint for dev
CMD ["npm", "start"]

# ENTRYPOINT [ "/bin/bash" ]
