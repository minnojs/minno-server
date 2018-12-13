FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/minnoserver

# install global applications
RUN apk add --no-cache --virtual .gyp python make g++
RUN npm install -g --no-optional node-gyp nodemon wait-for-mongo

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.4.0/wait /wait
RUN chmod +x /wait

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install --no-optional
