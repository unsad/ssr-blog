'use strict';

// Run with the application's installed dependencies; no database or backend needed.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const { EventEmitter } = require('events');
const { PassThrough } = require('stream');
const root = path.resolve(__dirname, '..');
const runtime = require('../server/runtime');
const dependency = name => require(require.resolve(name, { paths: [root, '/app'] }));
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function until(predicate) {
  for (let i = 0; i < 400; i++) {
    if (predicate()) return;
    await delay(5);
  }
  throw new Error('Timed out waiting for application state');
}

async function testRetry() {
  let attempts = 0;
  const result = await runtime.retry(() => {
    if (++attempts < 3) return Promise.reject(new Error('backend unavailable'));
    return Promise.resolve('ready');
  }, { delayMs: 1, maxDelayMs: 2 });
  assert.strictEqual(result, 'ready');
  assert.strictEqual(attempts, 3);

  const waits = [];
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'server/runtime.js'), 'utf8'), {
    module,
    setTimeout(fn, ms) { waits.push(ms); setImmediate(fn); }
  });
  const failure = new Error('still unavailable');
  attempts = 0;
  let caught;
  try {
    await module.exports.retry(() => { attempts++; throw failure; });
  } catch (err) { caught = err; }
  assert.strictEqual(caught, failure);
  assert.strictEqual(attempts, 6);
  assert.deepStrictEqual(waits, [1000, 2000, 4000, 5000, 5000]);
  console.log('PASS retry: recovery, bounded attempts, capped exponential delay');
}

async function testConfig() {
  let data = [{ key: 'faviconUrl', value: '/favicon.ico' }];
  const requests = [];
  const exports = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'server/config.js'), 'utf8'), {
    exports,
    process: { env: { NODE_ENV: 'production' } },
    require(name) {
      if (name === 'axios') return { get(url, options) {
        requests.push({ url, options });
        return Promise.resolve({ data });
      } };
      if (name === './mongo') return { serverHost: 'backend', serverPort: 3000, ssrPort: 8080 };
      throw new Error('Unexpected dependency ' + name);
    }
  });
  await exports.flushOption();
  await exports.flushOption();
  assert.strictEqual(exports.favicon, './dist/favicon.ico');
  assert.strictEqual(requests[0].options.timeout, 5000);
  data = { message: 'backend not ready' };
  let caught;
  try { await exports.flushOption(); } catch (err) { caught = err; }
  assert(caught && /expected an array/.test(caught.message));
  console.log('PASS configuration: request timeout, response validation, idempotent refresh');
}

function boot(options = {}) {
  const state = { attempts: 0, ready: 0, exitCode: null, errors: [], streams: [], disconnectCount: 0 };
  const realExpress = dependency('express');
  const express = () => {
    const app = realExpress();
    const listen = app.listen;
    app.listen = function() {
      if (options.bindFailure) {
        const emitter = new EventEmitter();
        setImmediate(() => emitter.emit('error', new Error('EADDRINUSE')));
        return emitter;
      }
      state.server = listen.apply(app, arguments);
      return state.server;
    };
    return app;
  };
  express.static = realExpress.static;
  const config = {
    ssrPort: 0,
    serverHost: 'fake-backend',
    serverPort: 3000,
    title: 'Test',
    flushOption() {
      state.attempts++;
      return state.attempts <= (options.failures || 0)
        ? Promise.reject(new Error('ECONNREFUSED')) : Promise.resolve();
    }
  };
  const renderer = {
    renderToStream(context) {
      if (context.url === '/sync-error') throw new Error('synchronous renderer failure');
      context.meta = { inject() {
        if (context.url === '/meta-error') throw new Error('metadata failure');
        return { title: { text: () => '<title>Test</title>' }, meta: { text: () => '' }, link: { text: () => '' } };
      } };
      const stream = new PassThrough();
      state.streams.push(stream);
      setImmediate(() => {
        if (context.url === '/404') return stream.emit('error', { code: 404 });
        if (context.url === '/redirect') return stream.emit('error', { url: '/ok' });
        if (context.url === '/fail') return stream.emit('error', new Error('backend 429'));
        if (context.url === '/string-error') return stream.emit('error', 'invalid post');
        if (context.url === '/null-error') return stream.emit('error', null);
        stream.write('<html>test');
        if (context.url === '/partial') {
          return setTimeout(() => stream.emit('error', new Error('late failure')), 30);
        }
        if (context.url === '/disconnect' && state.disconnectCount++ === 0) return;
        stream.end('</html>');
      });
      return stream;
    }
  };
  const logger = { info() {}, error() {} };
  const mappings = {
    express,
    log4js: { getLogger: () => logger },
    fs: { readFileSync: () => '<div id=app></div>' },
    jsdom: { JSDOM: class { constructor() { this.window = { document: {}, navigator: {} }; } } },
    'node-schedule': { scheduleJob() {} },
    axios: { get() {
      return options.failFeeds ? Promise.reject(new Error('feed unavailable')) : Promise.resolve({ data: [] });
    } },
    './server/config': config,
    './server/runtime': {
      sendRenderError: runtime.sendRenderError,
      retry(fn, opts) { return runtime.retry(fn, Object.assign({}, opts, { delayMs: 1, maxDelayMs: 2 })); }
    },
    './middleware/serverGoogleAnalytic': () => {},
    './middleware/favicon': () => (req, res) => res.end(),
    './server/robots.js': () => '',
    './server/sitemap.js': { getSitemapFromBody: () => '' },
    './server/rss.js': { getRssBodyFromBody: () => '' },
    'vue-server-renderer': { createBundleRenderer: () => renderer },
    './dist/vue-ssr-server-bundle.json': {},
    './dist/vue-ssr-client-manifest.json': {}
  };
  const sandbox = {
    __dirname: root,
    require(name) { return name in mappings ? mappings[name] : dependency(name); },
    process: {
      env: { NODE_ENV: 'production' }, on() {},
      exit(code) { state.exitCode = code; },
      send(message) {
        assert.strictEqual(message, 'ready');
        assert(state.server && state.server.listening, 'readiness must follow listen');
        state.ready++;
      }
    },
    console: { info() {}, warn() {}, error() { state.errors.push(Array.from(arguments)); } }
  };
  sandbox.global = sandbox;
  vm.runInNewContext(fs.readFileSync(path.join(root, 'server.js'), 'utf8'), sandbox, { filename: 'server.js' });
  return state;
}

function request(state, route, abortAfterData = false) {
  return new Promise((resolve, reject) => {
    let finished = false;
    const finish = result => { if (!finished) { finished = true; resolve(result); } };
    const req = http.get({ host: '127.0.0.1', port: state.server.address().port, path: route }, res => {
      let body = '';
      res.on('data', chunk => {
        body += chunk;
        if (abortAfterData) req.destroy();
      });
      res.on('end', () => finish({ status: res.statusCode, body, headers: res.headers, complete: res.complete }));
      res.on('aborted', () => finish({ status: res.statusCode, body, complete: false }));
      res.on('error', err => finish({ error: err.code, complete: false }));
      res.on('close', () => { if (!res.complete) finish({ status: res.statusCode, body, complete: false }); });
    });
    req.setTimeout(2000, () => { req.destroy(); reject(new Error('request hung: ' + route)); });
    req.on('error', err => finish({ error: err.code, complete: false }));
  });
}

async function testStartup() {
  const recovered = boot({ failures: 2, failFeeds: true });
  await until(() => recovered.ready === 1);
  assert.strictEqual(recovered.attempts, 3);
  assert.strictEqual(recovered.exitCode, null);
  await delay(10);
  assert(recovered.errors.some(args => args[0] === '[rss] refresh failed:'));
  assert(recovered.errors.some(args => args[0] === '[sitemap] refresh failed:'));
  await new Promise(resolve => recovered.server.close(resolve));

  const failed = boot({ failures: Infinity });
  await until(() => failed.exitCode !== null);
  assert.strictEqual(failed.exitCode, 1);
  assert.strictEqual(failed.attempts, 6);
  assert.strictEqual(failed.server, undefined);
  assert.strictEqual(failed.ready, 0);

  const bindFailed = boot({ bindFailure: true });
  await until(() => bindFailed.exitCode !== null);
  assert.strictEqual(bindFailed.exitCode, 1);
  assert.strictEqual(bindFailed.ready, 0);
  console.log('PASS startup: dependency recovery, failed startup exits, bind errors, readiness, nonfatal feeds');
}

async function testRendering() {
  const app = boot();
  await until(() => app.ready === 1);
  try {
    const healthy = await request(app, '/ok');
    assert.strictEqual(healthy.status, 200);
    assert.strictEqual(healthy.body, '<html>test</html>');
    for (const route of ['/fail', '/string-error', '/null-error', '/sync-error', '/meta-error']) {
      const result = await request(app, route);
      assert.strictEqual(result.status, 500, route);
      assert.strictEqual(result.body, '500 | Internal Server Error', route);
    }
    const missing = await request(app, '/404');
    assert.strictEqual(missing.status, 404);
    const redirect = await request(app, '/redirect');
    assert.strictEqual(redirect.status, 302);
    assert.strictEqual(redirect.headers.location, '/ok');
    const partial = await request(app, '/partial');
    assert.strictEqual(partial.complete, false);
    await request(app, '/disconnect', true);
    await until(() => app.streams[app.streams.length - 1].destroyed);
    const afterAbort = await request(app, '/disconnect');
    assert.strictEqual(afterAbort.status, 200);
    assert.strictEqual(afterAbort.body, '<html>test</html>');
    const concurrent = await Promise.all([request(app, '/fail'), request(app, '/fail')]);
    concurrent.forEach(result => assert.strictEqual(result.status, 500));
    assert.strictEqual((await request(app, '/ok')).status, 200);
    assert.strictEqual(app.exitCode, null);
  } finally {
    await new Promise(resolve => app.server.close(resolve));
  }
  console.log('PASS rendering: missing Accept, 404, redirect, error objects, partial streams, disconnect, concurrency, recovery');
}

(async () => {
  console.log('Runtime ' + process.version);
  await testRetry();
  await testConfig();
  await testStartup();
  await testRendering();
  console.log('ALL REGRESSION CHECKS PASSED');
})().catch(err => { console.error(err.stack || err); process.exit(1); });
