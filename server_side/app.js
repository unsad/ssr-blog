/**
 * Created by unsad on 2017/5/9.
 */
const Koa = require('koa');
const log = require('./utils/log');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const koa2RestMongoose = require('./mongo_rest/index');
const models = require('./model/mongo');
const tokenService = require('./service/token');
const redis = require('./model/redis');

app.use(bodyParser());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

const {login, logout} = require('./routes/admin');
router.post('/admin/login', login);
router.post('./admin/logout', logout);

let permission = async (next) => {
  const headers = this.request.headers;
  let token;
  try {
    token = headers['authorization'];
  } catch (err) {
    return this.body = err;
  }
  if (!token) {
    return this.body = 'Token not found';
  }
  const result = tokenService.verifyToken(token);
  if (result === false) {
    return this.body = 'Token verify failed';
  }
  let reply = await redis.getAsync('token');
  if (reply === token) {
    await next;
    return;
  } else {
    console.log(reply, token);
    return this.body = 'token invalid';
  }
};

Object.keys(models).forEach(value => {
  koa2RestMongoose(app, router, models[value], '/api', permission);
});

app.listen(3000);

console.log('koa2 is running at 3000');

