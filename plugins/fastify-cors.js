

const fastifyCors = require('@fastify/cors');

module.exports = fastify => {
  fastify.register(fastifyCors, {
    origin: '*',
  });
};
