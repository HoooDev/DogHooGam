FROM node:14-alpine

ARG NEXT_PUBLIC_KAKAO_API_KEY

WORKDIR /usr/src/next

RUN npm i --global pm2

COPY ./package*.json ./

RUN npm i

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start" ]