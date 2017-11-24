/**
 * Created by unsad on 2017/11/21.
 */
const ratelimit = require('koa-ratelimit');

module.exports = class {
  constructor(options) {
    this.options = options
  }

  async beforeUseRoutes({app, redis}) {
    const config = Object.assign({}, this.options, {
      db: redis
    });
    app.use(ratelimit(config))
  }
}