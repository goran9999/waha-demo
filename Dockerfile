FROM node:latest

WORKDIR /app

COPY ./ /app

COPY ["package.json", "./"]


RUN npm i @swc/core-linux-arm64-gnu --force

RUN npm install --force

EXPOSE 5500

CMD ["npm","run","start:api"]