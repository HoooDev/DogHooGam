FROM node:14-alpine

ARG NEXT_PUBLIC_KAKAO_KEY
ARG NEXT_PUBLIC_PINATA_API_KEY
ARG NEXT_PUBLIC_PINATA_API_SECRET
ARG NEXT_PUBLIC_COINBASE
ARG NEXT_PUBLIC_COINBASE_PASSWORD
ARG NEXT_PUBLIC_GETH_NODE


WORKDIR /usr/src/next

RUN npm i --global pm2

COPY ./package*.json ./

RUN npm i

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start" ]