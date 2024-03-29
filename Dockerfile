FROM node:14.8.0-stretch-slim
LABEL maintainer="GwenBebe"
WORKDIR /src

RUN apt-get update && apt-get install -y --no-install-recommends build-essential && apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 8080

COPY package.json /src/package.json
COPY angular.json /src/angular.json
COPY tsconfig.app.json /src/tsconfig.app.json
COPY tsconfig.base.json /src/tsconfig.base.json
COPY tsconfig.spec.json /src/tsconfig.spec.json
COPY tsconfig.json /src/tsconfig.json

RUN npm install

COPY . /src

RUN npm run build

RUN ls

CMD npm start
