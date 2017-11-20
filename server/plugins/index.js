/**
 * Created by unsad on 2017/11/20.
 */
const middlewares = [
  'beforeServerStart',
  'beforeRestful'
].map(name => {
  const middlewares = require(`./${name}`);
  return {
    name,
    middlewares
  }
}).reduce((prev, curr) => {
  prev[curr.name] = curr.middlewares;
  return prev;
}, {});

module.exports = middlewares;