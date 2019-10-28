FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3009

CMD ["yarn", "dev"]
