FROM node:14.8.0-stretch-slim
LABEL maintainer="GwenBebe"
WORKDIR /src

RUN apt-get update && apt-get install -y --no-install-recommends build-essential && apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 8080

COPY package.json /src/package.json
RUN npm install

RUN npm build

COPY . /src

CMD npm start
