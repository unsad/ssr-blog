
FROM node:7.7

# copy all files to target
COPY . /app

# install mongo & redis

RUN apt-get update \
    && apt-get install -y redis-server \
# install npm packages
RUN npm i -g pm2
# install dependences
RUN cd /app/server && npm install
RUN cd /app/front && npm install && npm run build

# clean cache
RUN npm cache clean

WORKDIR /app

EXPOSE 3000
EXPOSE 8080


CMD redis-server /etc/redis/redis.conf&&pm2-docker start pm2.json