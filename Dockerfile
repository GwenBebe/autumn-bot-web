FROM node:14.8.0-stretch-slim
LABEL maintainer="GwenBebe"
WORKDIR /

RUN apt-get update && apt-get install -y --no-install-recommends build-essential && apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 8080

RUN npm install

RUN npm run build

RUN ls

CMD npm start
