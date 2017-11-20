const redis = require('../model/redis');
const tokenService = require('../service/token');
const {user: model} = require('../model/mongo');

module.exports = async (ctx, next) => {
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
        description: 'Get token failed.Check the password'
      }
    }
  } catch (_error) {
    error = _error;
    return ctx.body = {
      status: 'fail',
      description: 'Get token failed.Check the name'
    }
  }
}