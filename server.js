const fastify = require('fastify');
const { registerPlugins } = require('./plugins');
const config = require('./config');
const routes = require('./v1/routes');

const server = fastify({});

module.exports.start = async () => {
  registerPlugins(server, config);

  server.register(routes, { prefix: config.stripPrefix.path });
  await server.listen({ port: config.app.port, host: '::' });

  return server;
};
