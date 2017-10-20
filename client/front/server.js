/**
 * Created by unsad on 2017/9/24.
 */
const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const microcache = require('route-cache');
const robots = require('./server/robots.js');
const axios = require('axios');
const { api: sitemapApi, getSitemapFromBody } = require('./server/sitemap.js');
const { api: rssApi, getRssBodyFromBody } = require('./server/rss.js');
let { title } = require('./server/config');

axios.get('localhost:3000/api/options?conditions={"key": "title"}').then(result => {
  if (Array.isArray(result) && result.length !== 0) {
    title = result[0].value;
  }
});

const schedule = require('node-schedule');

let sitemap = '';
axios.get(sitemapApi).then(result => {
  sitemap = getSitemapFromBody(result);
});

let sitemapJob = schedule.scheduleJob(`30 3 * * *`, () => {
  axios.get(sitemapApi).then(result => {
    sitemap = getSitemapFromBody(result);
  });
});

let rss = '';
axios.get(rssApi).then(result => {
  rss = getRssBodyFromBody(result);
});

let rssJob = schedule.scheduleJob(`30 3 * * *`, () => {
  axios.get(rssApi).then(result => {
    rss = getRssBodyFromBody(result);
  });
});

const resolve = file => path.resolve(__dirname, file);
const {createBundleRenderer} = require('vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MIRCO_CACHE !== 'false';
const serverInfo =
  `express/${require('express/package.json').version}` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const app = express();

const template = fs.readFileSync(resolve('./index.html'), 'utf-8');

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    runInNewContext: false
  }));
}
let renderer;
let readyPromise;

if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    clientManifest
  });
} else {
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

app.use(compression({threshold: 0}));
app.use('./dist', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl));
app.use(bodyParser.json());

function render (req, res) {
  const s = Date.now();

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Server', serverInfo);

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found');
    } else {
      res.status(500).send('500 | Internal Server Error');
      console.error(`error during render: ${req.url}`);
      console.error(err.stack);
    }
  };

  const context = {
    title: 'Vue HN 2.0',
    url: req.url
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err);
    }
    res.send(html);
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`);
    }
  });
}

app.get('/robots.txt', (req, res) => {
  res.end(robots);
});

app.get('./rss.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.end(rss);
});

app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.end(sitemap);
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  return next();
});

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

