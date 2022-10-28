FROM node:14.19.2 as build-stage
WORKDIR /var/jenkins_home/workspace/c103/front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm start

FROM nginx:stable-alpine as production-stage

# COPY --from=build-stage /var/jenkins_home/workspace/c103/front/build /usr/share/nginx/html
# COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["npm", "start"]