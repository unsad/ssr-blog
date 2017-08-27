/**
 * Created by unsad on 2017/8/11.
 */
const redis = require('redis');
const log = require('../utils/log');

let client = redis.createClient();

client.on('error', (err) => log.error('Redis Error', err));

client.on('connect', () => log.debug('Redis is ready'));

module.exports = client;