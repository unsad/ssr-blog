/**
 * Created by unsad on 2017/8/11.
 */
const redis = require('redis');
const bluebird = require('bluebird');
const log = require('../utils/log');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = redis.createClient();

client.on('error', (err) => log.error('Redis Error', err));

client.on('connect', () => log.debug('Redis is ready'));

module.exports = client;