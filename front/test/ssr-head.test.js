'use strict';

// Exercise the real streaming renderer: metadata must precede the first body byte.
process.env.VUE_ENV = 'server';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const VueMeta = require('vue-meta');
const { createRenderer } = require('vue-server-renderer');
const { JSDOM } = require('jsdom');

Vue.use(VueMeta);
const template = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const renderer = createRenderer({ template });
const viewport = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';

function render(title) {
  const app = new Vue({
    metaInfo: {
      title,
      meta: [
        { name: 'viewport', content: viewport },
        { name: 'description', content: 'Streaming SSR head regression' }
      ],
      link: [{ rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml' }]
    },
    render: h => h('div', { attrs: { id: 'app' } }, 'Page content '.repeat(5000))
  });
  const stream = renderer.renderToStream(app, { meta: app.$meta() });
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk.toString()));
    stream.on('error', reject);
    stream.on('end', () => resolve(chunks));
  });
}

(async () => {
  // Separate requests must receive their own title, including escaped user text.
  for (const title of ['Home - Blog', 'Article <test> & Blog']) {
    const chunks = await render(title);
    const html = chunks.join('');
    assert(html.indexOf('name="viewport"') < html.indexOf('</head>'));
    assert(html.indexOf('</head>') < html.indexOf('<body>'));
    assert(chunks[0].includes('name="viewport"'), 'Viewport is required in the first head chunk');
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    assert(doc.documentElement.hasAttribute('data-vue-meta-server-rendered'));
    assert.strictEqual(doc.title, title);
    assert.strictEqual(doc.querySelectorAll('meta[name="viewport"]').length, 1);
    assert.strictEqual(doc.querySelector('head meta[name="viewport"]').content, viewport);
    assert.strictEqual(doc.querySelector('meta[name="viewport"]').getAttribute('data-vue-meta'), 'ssr');
    assert.strictEqual(doc.querySelector('head link[rel="alternate"]').getAttribute('href'), '/rss.xml');
    assert(doc.querySelector('#app').textContent.startsWith('Page content'));
    dom.window.close();
  }
  console.log('PASS streamed SSR: viewport in first head chunk, one managed viewport, isolated/escaped metadata, intact body');
})().catch(err => { console.error(err); process.exitCode = 1; });
