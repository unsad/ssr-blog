/**
 * Created by unsad on 2017/11/21.
 */
const bodyParser = require('koa-bodyparser');

module.exports = class {
  async beforeUseRoutes({ app }) {
    app.use(bodyParser())
  }
}