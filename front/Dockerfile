
FROM node:11.6

# copy all files to target
COPY . /app
RUN npm set registry https://registry.npm.taobao.org
RUN npm i -g pm2
# clean cache
RUN npm cache verify

WORKDIR /app
EXPOSE 8080


CMD ["pm2-docker", "start", "pm2.json", "--env", "production"] 