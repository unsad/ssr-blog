/**
 * Created by unsad on 2017/8/11.
 */
const config = require('../conf/config');
const redis = require('redis');
const bluebird = require('bluebird');
const log = require('../utils/log');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const auth = config.redisPassword ? { password: config.redisPassword } : {};

let client = redis.createClient(Object.assign({}, auth, {
  host: config.redisHost,
  port: config.redisPort
}));

client.on('error', (err) => log.error('Redis Error', err));

client.on('connect', () => log.debug('Redis is ready'));

module.exports = client;