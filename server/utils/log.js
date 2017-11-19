/**
 * Created by unsad on 2017/5/9.
 */
const log4js = require('log4js');
const config = require('../conf/config');

let log = log4js.getLogger(config.mongoDatabase);

module.exports = log;