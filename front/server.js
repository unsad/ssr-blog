/**
 * Created by unsad on 2017/9/24.
 */
const isProd = process.env.NODE_ENV === 'production';
const log = require('log4js').getLogger('ssr server');
log.level = 'info';
const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const LRU = require('lru-cache');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const microcache = require('route-cache');
const schedule = require('node-schedule');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const sendGoogleAnalytic = require('./middleware/serverGoogleAnalytic');
const favicon = require('./middleware/favicon');
const getRobotsFromConfig = require('./server/robots.js');
const { api: sitemapApi, params: sitemapParams, getSitemapFromBody } = require('./server/sitemap.js');
const { api: rssApi, params: rssParams, getRssBodyFromBody } = require('./server/rss.js');
const config = require('./server/config');

const uuid = require('uuid');
const titleReg = /<.*?>(.+?)<.*?>/;
const expires = 3600 * 1000 * 24 * 365 * 2;
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
let sitemap = '';
let rss = '';
let robots = '';

process.on('warning', e => console.warn(e.stack));

global.window = dom.window;
global.document = window.document;
global.navigator = window.navigator;

config.flushOption().then(() => {
  robots = getRobotsFromConfig(config);
  const flushSitemap = () => axios.get(sitemapApi, sitemapParams).then(result => {
    sitemap = getSitemapFromBody(result, config);
  });
  const flushRss = () => axios.get(rssApi, rssParams).then(result => {
    rss = getRssBodyFromBody(result, config);
  });

  flushSitemap();
  flushRss();

  schedule.scheduleJob('30 3 * * *', function () {
    flushRss();
    flushSitemap();
  });

  function flushHtml(template) {
    const i = template.indexOf('<div id=app></div>');
    return {
      head: template.slice(0, i).replace('<link href="/dist/styles.css" rel="stylesheet">', style),
      tail: template.slice(i + '<div id=app></div>'.length),
      origin: template
    };
  }

  const { createBundleRenderer } = require('vue-server-renderer');

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
  } else {
    readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
      renderer = createRenderer(bundle, options);
    });
  }

  const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });

  app.use(compression({ threshold: 0 }));

  app.use(require('cookie-parser')());

  app.use((req, res, next) => {
    log.info(`${req.method} ${decodeURIComponent(req.url)}`);
    return next();
  });

  app.get('/favicon.ico', favicon(config.favicon));
  app.use('/dist', serve('./dist', true));
  app.use('/public', serve('./public', true));
  app.use('/static', serve('./static', true));
  app.use('/service-worker.js', serve('./dist/service-worker.js'));
  app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl));
  app.use(bodyParser.json());
  function render(req, res, next) {
    const s = Date.now();

    res.header('Content-Type', 'text/html;charset=utf-8');

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
      const { title, link, meta } = context.meta.inject();
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
      sendGoogleAnalytic(req, res, next, {
        dt: matched ? matched[1] : config.title,
        dr: req.url,
        dp: req.url,
        z: Number(Date.now()),
        cid: clientId
      });
    });
    renderStream.on('data', chunk => {
      res.write(chunk);
    });

    renderStream.on('end', () => {
      res.end();
      log.info(`whole request: ${Date.now() - s}ms`);
    });

    renderStream.on('error', err => {
      res.end(err);
      log.error(err);
    });
  }

  app.get('/_.gif', (req, res, next) => sendGoogleAnalytic(req, res, next));

  app.get('/robots.txt', (req, res, next) => {
    return res.end(robots);
  });

  app.get('/rss.xml', (req, res, next) => {
    res.header('Content-Type', 'application/xml');
    res.end(rss);
  });

  app.get('/sitemap.xml', (req, res, next) => {
    res.header('Content-Type', 'application/xml');
    return res.end(sitemap);
  });

  const prefix = '/proxyPrefix';
  app.use((req, res, next) => {
    const url = decodeURIComponent(req.url);
    if (!isProd) return next();
    if (url.startsWith(prefix)) {
      const rewriteUrl = ` http://${config.serverHost}:${config.serverPort}/${url.replace(prefix, '')}`;
      console.log('rewrite', rewriteUrl);
      axios.get(rewriteUrl).on('error', err => {
        res.end(err);
        log.error(err);
      }).pipe(res);
    } else {
      return next();
    }
  });
  app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res));
  });

  const port = config.ssrPort;
  app.listen(port, () => {
    log.info(`server started at localhost:${port}`);
  });
}).catch(err => log.error(err));

