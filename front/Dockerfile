# FROM node:14.19.2 as bustageild-
# WORKDIR /var/jenkins_home/workspace/c103/front
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # FROM nginx:stable-alpine as production-stage

# # COPY --from=build-stage /vra/jenkins_home/workspace/c103/front/build /usr/share/nginx/html
# # COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 3000
# CMD [ "npm", "start" ]

FROM node:14-alpine

WORKDIR /usr/src/next

COPY *.* /usr/src/next

RUN npm install

COPY . /usr/src/next

RUN npm run build

CMD [ "npm" , "run" , "dev"]