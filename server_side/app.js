/**
 * Created by unsad on 2017/5/9.
 */
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
app.use(ctx => {
  ctx.body = 'hello koa';
});

app.listen(3000);
console.log('koa2 is running at 3000');
