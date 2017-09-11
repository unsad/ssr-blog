const redis = require('../model/redis');
const tokenService = require('../service/token');
const {user: model} = require('../model/mongo');

exports.login = async (ctx, next) => {
  let error, result;
  let users, user;

  try {
    users = await model.find({name: ctx.request.body.name}).exec();
    user = {
      name: users[0].name,
      password: users[0].password
    };

    if (user.password === ctx.request.body.password) {
      let token = tokenService.createToken(user);
      redis.set('token', token, 'EX', tokenService.expiresIn, () => {

      });
      return ctx.body = {
        token: token,
        status: 'success'
      };
    } else {
      return ctx.body = {
        status: 'fail',
        description: 'Get token failed.Check name and password'
      }
    }
  } catch (_error) {
    error = _error;
    return ctx.body = {
      status: 'fail',
      description: error
    }
  }
};

exports.logout = async (ctx, next) => {
  const headers = ctx.request.headers;
  let token;
  try {
    token = headers['authorization'];
  } catch (err) {
    return ctx.body = {
      status: 'fail',
      description: err
    };
  }

  if (!token) {
    return ctx.body = {
      status: 'fail',
      description: 'Token not found'
    };
  }

  const result = tokenService.verifyToken(token);

  if (result === false) {
    return ctx.body = {
      status: 'fail',
      description: 'Token verify failed'
    };
  } else {
    await redis.del('token');
    return ctx.body = {
      status: 'success',
      description: 'Token delete!'
    };
  }
};

exports.permission = async (ctx, next) => {
  const headers = ctx.request.headers;
  let token;
  try {
    token = headers['authorization'];
  } catch (err) {
    return ctx.body = {
      status: 'fail',
      description: err
    };
  }
  if (!token) {
    return ctx.body = {
      status: 'fail',
      description: 'Token not found'
    };
  }
  const result = tokenService.verifyToken(token);
  if (result === false) {
    return ctx.body = {
      status: 'fail',
      description: 'Token verify failed'
    };
  }
  let reply = await redis.getAsync('token');
  if (reply === token) {
    await next;
    return;
  } else {
    return ctx.body = {
      status: 'fail',
      description: 'token invalid'
    };
  }
};
