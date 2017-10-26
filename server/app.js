/**
 * Created by unsad on 2017/5/9.
 */
const Koa = require('koa');
const log = require('./utils/log');
const router = require('koa-router')();
const fs = require('fs');
const path = name => require('path').join(__dirname, 'theme', name);
const bodyParser = require('koa-bodyparser');
const koa2RestMongoose = require('./mongo_rest/index');
const models = require('./model/mongo');
const tokenService = require('./service/token');
const redis = require('./model/redis');
const config = require('./conf/config');
const option = require('./conf/option');
const getQiniuTokenFromFileName = require('./service/qiniu');
const {login, logout, permission} = require('./routes/admin');

const app = new Koa();
app.use(bodyParser());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`);
});

router.post('/admin/token', permission, (ctx, next) => {
  const { key } = ctx.request.body;
  ctx.body = getQiniuTokenFromFileName(key);
});
router.post('/admin/login', login);
router.post('/admin/logout', logout);

Object.keys(models).forEach(value => {
  koa2RestMongoose(app, router, models[value], '/api', permission);
});

(async () => {
  let count = await models.user.find().count().exec();
  if (count === 0) {
    if (config.defaultAdminPassword === 'admin') {
      log.error('you must change the default password at ./conf/confjg.js');
      log.error('koa2 refused to start bacause of weak password');
      return process.exit(1);
    }

    let result = await models.user.create({
      name: config.defaultAdminName,
      password: config.defaultAdminPassword,
      displayName: config.defaultAdminName,
      email: ''
    });

    log.info(`account '${result.name}' with password '${result.password}' is created`);

    await initOption();
    await initMenu();
  }

  await installTheme();

  app.listen(3000);

  log.debug('koa2 is running at 3000');

})();

// async function initMenu() {
//   for (let i = 0, len = menu.length; i < len; i++) {
//     let url = menu[i].url;
//     let count = await models.menu.find({url}).count().exec();
//     if (count === 0) {
//       await models.menu.create(menu[i]);
//       log.info( `Menu ${url} created`);
//     }
//   }
// }

async function installTheme() {
  let fileArr = fs.readdirSync('./theme');
  for (let i = 0, len = fileArr.length; i < len; i++) {
    let fileName = fileArr[i];
    let theme = require(`./theme/${fileName}`);
    let count = await models.theme.find({name: theme.name}).count().exec();
    if (count === 0) {
      await models.theme.create(theme);
      log.info(`theme ${theme.name} created`);
    }
  }
}

async function initOption() {
  for (let i = 0, len = option.length; i < len; i++) {
    let key = option[i].key;
    let value = option[i].value;
    let count = await models.option.find({key}).count().exec();
    if (count === 0) {
      await models.option.create(option[i]);
      log.info(`Option ${key} created`);
    }
  }
}
