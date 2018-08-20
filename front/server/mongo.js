const env = process.env;

module.exports = {
  ssrPort: env.ssrPort || 8080,
  serverPort: env.serverPort || 3000,
  serverHost: env.serverHost || 'localhost',
  redisPassword: env.redisPassword || '',
  enableServerSideGA: env.enableServerSideGA || false
}
