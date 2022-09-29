

const swagger = require('./fastify-swagger');
const cors = require('./fastify-cors');
const healthcheck = require('./fastify-healthcheck');
const schemaCompiler = require('./fastify-schema-compiler');

const plugins = [
  swagger,
  cors,
  healthcheck,
  schemaCompiler,
];

const registerPlugins = (fastify, config) => {
  plugins.forEach(plugin => plugin(fastify, config));
};

module.exports = {
  registerPlugins,
};
