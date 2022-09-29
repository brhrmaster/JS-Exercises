

const fastifySwagger = require('@fastify/swagger');

module.exports = (fastify, config) => {
  const options = {
    routePrefix: `${config.stripPrefix.path}/docs`,
    exposeRoute: true,
    swagger: {
      info: {
        title: 'JS Exercises',
        description: 'REST API for JS Exercises Architecture',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  };

  fastify.register(
    fastifySwagger,
    options,
  );

  fastify.ready(() => {
    fastify.swagger();
  });
};
