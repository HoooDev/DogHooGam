FROM node:14-alpine

WORKDIR /usr/src/next

RUN npm i --global pm2

COPY ./package*.json ./

RUN npm i

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start" ]