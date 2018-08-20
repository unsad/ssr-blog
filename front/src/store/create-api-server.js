/**
 * Created by unsad on 2017/11/15.
 */
const isProd = process.env.NODE_ENV === 'production';
const { serverPort, serverHost } = require('../../server/config');

export default {
  host: isProd ? `http://${serverHost}:${serverPort}` : 'http://localhost:8080/proxyPrefix'
};
