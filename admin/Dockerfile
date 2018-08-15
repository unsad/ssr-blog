
FROM node:7.7

# copy all files to target
COPY . /app

# install dependences
RUN cd /app/admin && npm install && npm run build

# clean cache
RUN npm cache clean

WORKDIR /app

EXPOSE 8082