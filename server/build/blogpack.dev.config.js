/**
 * Created by unsad on 2017/11/21.
 */
const base = require('./blogpack.base.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'
const serverStartPrefix = '../plugins/beforeServerStart'
const env = process.env

const config = Object.assign({}, base)

const BodyParserPlugin = require(`${useRoutesPrefix}/bodyParser`)
const LogTimePlugin = require(`${useRoutesPrefix}/logTime`)
const RestcPlugin = require(`${useRoutesPrefix}/restc`)
const InitOptionPlugin = require(`${serverStartPrefix}/initOption`)
const InstallThemePlugin = require(`${serverStartPrefix}/installTheme`)
const InitUserPlugin = require(`${serverStartPrefix}/initUser`)

const CheckAuthPlugin = require('../plugins/beforeRestful/checkAuth')

const QiniuUploadPlugin = require('../plugins/mountingRoute/qiniu')
const LoginPlugin = require('../plugins/mountingRoute/login')
const LogoutPlugin = require('../plugins/mountingRoute/logout')

config.plugins.push(
  // beforeUseRoutes
  new BodyParserPlugin(),
  new LogTimePlugin(),
  new RestcPlugin(),

  // beforeRestful
  new CheckAuthPlugin(),
  // moutingRoute
  new QiniuUploadPlugin({
    qiniuAccessKey: env.qiniuAccessKey || config.config.qiniuAccessKey,
    qiniuSecretKey: env.qiniuSecretKey || config.config.qiniuSecretKey,
    qiniuBucketHost: env.qiniuBucketHost || config.config.qiniuBucketHost,
    qiniuBucketName: env.qiniuBucketName || config.config.qiniuBucketName,
    qiniuPipeline: env.qiniuPipeline || config.config.qiniuPipeline
  }),
  new LoginPlugin(),
  new LogoutPlugin(),
  // beforeServerStart
  new InitUserPlugin(),
  new InstallThemePlugin(),
  new InitOptionPlugin()
)

module.exports = config