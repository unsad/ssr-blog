/**
 * Created by unsad on 2017/11/21.
 */
const blogpack = require('../blogpack')
const devConfig = require('./blogpack.dev.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'

const config = Object.assign({}, devConfig)

const RatelimitPlugin = require(`${useRoutesPrefix}/ratelimit`)

config.plugins.unshift(
  // beforeUseRoutes
  new RatelimitPlugin({
    duration: 10000,
    errorMessage: 'Slow Down Your Request',
    id: ctx => ctx.ip,
    max: 100
  })
)

module.exports = config