
FROM node:7.7

# copy all files to target
COPY . /app
RUN npm i -g pm2
RUN cd /app && npm install

# clean cache
RUN npm cache clean

WORKDIR /app

EXPOSE 3000

CMD ["pm2-docker", "start", "pm2.json", "--env", "production"] 