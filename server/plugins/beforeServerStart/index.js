/**
 * Created by unsad on 2017/11/20.
 */
const initOption = require('./initOption');
const installTheme = require('./installTheme');
const initUser = require('./initUser');

module.exports = [
  initUser,
  installTheme,
  initOption
];