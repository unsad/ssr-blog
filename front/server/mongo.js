const env = process.env;

module.exports = {
  ssrPort: env.ssrPost || 8081,
  serverPort: env.serverPort || 3000,
  redisPassword: env.redisPassword || '',
  enableServerSideGA: env.enableServerSideGA || false
}
