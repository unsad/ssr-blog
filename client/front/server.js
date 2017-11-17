/**
 * Created by unsad on 2017/9/24.
 */
const isProd = process.env.NODE_ENV === 'production';

const log = require('log4js').getLogger('ssr server');
const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const LRU = require('lru-cache');
const favicon = require('serve-favicon');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const microcache = require('route-cache');
const schedule = require('node-schedule');
const axios = require('axios');
const uuid = require('uuid');
const sendGoogleAnalytic = require('./middleware/serverGoogleAnalytic');

const getRobotsFromConfig = require('./server/robots.js');
const { api: sitemapApi, getSitemapFromBody } = require('./server/sitemap.js');
const { api: rssApi, getRssBodyFromBody } = require('./server/rss.js');
const config = require('./server/config');
const titleReg = /<.*?>(.+?)<.*?>/;
const expires = 3600 * 1000 * 24 * 365 * 2;
const inline = isProd ? fs.readFileSync(resolve('./dist/styles.css'), 'utf-8') : '';

let sitemap = '';
let rss = '';
let robots = '';

config.flushOption().then(() => {
  robots = getRobotsFromConfig(config);

  const flushSitemap = () => axios.get(sitemapApi).then(result => {
    sitemap = getSitemapFromBody(result, config);
  });
  const flushRss = () => axios.get(rssApi).then(result => {
    rss = getRssBodyFromBody(result, config);
  });

  flushSitemap();
  flushRss();

  schedule.scheduleJob('30 3 * * *', function() {
    flushRss();
    flushSitemap();
  });
});

function flushHtml(template) {
  const style = isProd ? `<style type="text/css">${inline}</style>` : '';
  const i = template.indexOf('<div id=app></div>');
  return {
    head: template.slice(0, i).replace('<link href="/dist/styles.css" rel="stylesheet">', style),
    tail: template.slice(i + '<div id=app></div>'.length)
  }
}

const {createBundleRenderer} = require('vue-server-renderer');

const useMicroCache = process.env.MIRCO_CACHE !== 'false';

const app = express();
app.enable('trust proxy');

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
let html;
let readyPromise;

if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    clientManifest
  });
  html = flushHtml(template);
} else {
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options);
  });
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

app.use(compression({threshold: 0}));

app.use(require('cookie-parser'));

app.use((req, res, next) => {
  log.debug(`${req.method} ${decodeURIComponent(req.url)}`);
  return next();
});

app.use(favicon(config.favicon));
app.use('./dist', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));
app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl));
app.use(bodyParser.json());

function render (req, res, next) {
  const s = Date.now();

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Server', serverInfo);
  res.write(html.head);

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

  const supportWebp = req.header('accept').includes('image/webp');

  const context = {
    title: 'Vue HN 2.0',
    url: req.url,
    supportWebp
  };

  const renderStream = renderer.renderToStream(context);

  renderStream.once('data', () => {
    const {title, link, meta} = context.meta.inject();
    const titleText = title.text();
    const metaData = `${title.text()}${meta.text()}${link.text()}`;
    const matched = titleText.match(titleReg);
    let clientId = req.cookies.id;
    if (!clientId) {
      clientId = uuid.v4();
      res.cookie('id', clientId, {
        expires: new Date(Date.now() + expires)
      });
    }
    let chunk = html.head.replace('<title></title>', metaData);
    res.write(chunk);
    sendGoogleAnalytic(req, res, next, {
      dt: matched ? matched[1] : config.title,
      dr: req.url,
      dp: req.url,
      z: +Date.now(),
      cid: clientId
    })
  });
  renderStream.on('data', chunk => {
    res.write(chunk);
  });

  renderStream.on('end', () => {
    res.end(html.tail);
    log.debug(`whole request: ${Date.now} - s}ms`);
  });

  renderStream.on('error', err => {
    res.end(html.tail);
    log.error(err);
  })
}

app.get('/_.gif', (req, res, next) => sendGoogleAnalytic(req, res, next));

app.get('/robots.txt', (req, res, next) => {
  return res.end(robots);
});

app.get('./rss.xml', (req, res, next) => {
  res.header('Content-Type', 'application/xml');
  res.end(rss);
});

app.get('/sitemap.xml', (req, res, next) => {
  res.header('Content-Type', 'application/xml');
  return res.end(sitemap);
});

app.use((req, res, next) => {
  log.debug(`${req.method} ${req.url}`);
  return next();
});

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  log.debug(`server started at localhost:${port}`);
}).catch(err => log.error(err));

