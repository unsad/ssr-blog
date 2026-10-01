'use strict';

async function retry(operation, options = {}) {
  const {
    attempts = 6,
    delayMs = 1000,
    maxDelayMs = 5000,
    onRetry = () => {}
  } = options;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      if (attempt === attempts) throw err;
      const delay = Math.min(delayMs * Math.pow(2, attempt - 1), maxDelayMs);
      onRetry(err, attempt, delay);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

function sendRenderError(err, res) {
  if (res.finished || res.destroyed) return;
  // A partially streamed document cannot be replaced with a valid error page.
  if (res.headersSent) {
    res.destroy();
    return;
  }
  res.setHeader('Cache-Control', 'no-store');
  if (err && typeof err.url === 'string') {
    res.redirect(err.url);
  } else if (err && err.code === 404) {
    res.status(404).end('404 | Page Not Found');
  } else {
    res.status(500).end('500 | Internal Server Error');
  }
}

module.exports = { retry, sendRenderError };
