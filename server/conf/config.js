/**
 * Created by unsad on 2017/5/9.
 */
const env = process.env;

module.exports = {
  serverPort: env.serverPort || 3000,
  mongoHost: env.mongoHost || '127.0.0.1',
  mongoDatabase: env.mongoDatabase || 'blog',
  mongoPort: env.mongoPort || 19999,
  redisHost: env.redisHost || '127.0.0.1',
  redisPort: env.redisPort || 6379,
  redisPassword: env.redisPassword || '',
  tokenSecret: env.tokenSecret || 'test',
  tokenExpiresIn: env.tokenExpiresIn || 3600,
  defaultAdminName: env.defaultAdminName || 'admin',
  defaultAdminPassword: env.defaultAdminPassword || 'unsad',
  qiniuAccessKey: 'KMTVIK74xzTFkJ_kFEKlD86q1hC7dg-lHaI2RTMm',
  qiniuSecretKey: 'V13BAPuLiF5yQHup7MnPUz8ia0hJvXegfYiXD7f-',
  qiniuBucketHost: '//src.sweetalkos.com',
  qiniuBucketName: 'unsad',
  qiniuPipeline: ''
};