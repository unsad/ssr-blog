# ssr-blog

[![Build Status](https://travis-ci.org/unsad/ssr-blog.svg?branch=master)](https://travis-ci.org/unsad/ssr-blog) ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

![bg](https://src.sweetalkos.com/DmobetUUUAAhlD_.jpg)
A server-side-rending blog based on Vue2 && Koa2 && MongoDB with Persona5 theme.

## Preview

[click here](https://www.sweetalkos.com)




## Usage in Development

### What You Need Before Getting Started 

* Node.js
* MongoDB
* Redis

### server

```node
cd server
npm install
npm start // default serve at localhost: 3000
```

You can change config options at `server/conf/config.js`

### admin

```node
cd admin
npm install
npm run dev // default serve at localhost: 8082
```

### front

```node
cd front
npm install
npm run dev // default serve at localhost: 8080
```

## Usage in Production

### What You Need Before Getting Started 

* Docker

You should change the image to your own in `docker-compose.yml`

```node
    ...
  web_front:
    image: unsad/web_front // change to your own
    ...
  web_back:
    image: unsad/web_back // change to your own
    ...
```

```node
docker-compose up // default server at localhost:4000
```
## Lisence

[MIT](https://opensource.org/licenses/MIT)

