/**
 * Created by unsad on 2017/5/9.
 */
const Koa = require('koa');
const log = require('./utils/log');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const koa2RestMongoose = require('./mongo_rest/index');
const models = require('./model/mongo');
const tokenService = require('./service/token');
const redis = require('./model/redis');
const config = require('./conf/config');
const option = require('./conf/option');
const {login, logout, permission} = require('./routes/admin');

const app = new Koa();
app.use(bodyParser());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.post('/admin/login', login);
router.post('./admin/logout', logout);

Object.keys(models).forEach(value => {
  koa2RestMongoose(app, router, models[value], '/api', permission);
});

(async () => {
  await initOption();
  let count = await models.user.find().count().exec();
  if (count === 0) {
    if (config.defaultAdminPassword === 'admin') {
      log.error('you must change the default password at ./conf/confjg.js');
      log.error('koa2 refused to start bacause of weak password');
      return;
    }

    let result = await models.user.create({
      name: config.defaultAdminName,
      password: config.defaultAdminPassword,
      displayName: config.defaultAdminName,
      email: ''
    });

    log.info(`account '${result.name}' with password '${result.password}' is created`);
  }

  app.listen(3000);

  log.debug('koa2 is running at 3000');

})();

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
