

const fastifyHealthcheck = require('fastify-healthcheck');

module.exports = (fastify, config) => {
  fastify.register(fastifyHealthcheck, {
    healthcheckUrl: `${config.stripPrefix.path}/healthcheck`,
  });
};
