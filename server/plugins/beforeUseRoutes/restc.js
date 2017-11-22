/**
 * Created by unsad on 2017/11/21.
 */
const restc = require('restc');

module.exports = class {
  async beforeUseRoutes({ app }) {
    app.use(restc.koa2());
  }
};