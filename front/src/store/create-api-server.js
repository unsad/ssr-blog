/**
 * Created by unsad on 2017/11/15.
 */
const isProd = process.env.NODE_ENV === 'production';

export default {
  host: isProd ? `http://${process.env.serverHost}:3000` : 'http://localhost:8080/proxyPrefix'
};
