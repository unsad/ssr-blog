/**
 * Created by unsad on 2017/8/11.
 */
const redis = require('redis');

let client = redis.createClient();

client.on('error', (err) => console.log('Redis Error', err));

client.on('connect', () => console.log('Redis is ready'));

module.exports = client;