const numberEvaluationRoutes = require('./numberEvaluationRoutes');
const languageRoutes = require('./languageRoutes');

const registerRoutes = (fastify, routes) => {
  routes.forEach(route => {

    // add routing personalization here
    // example: headers for tracing logs

    fastify.route(route);
  });
};

module.exports = async fastify => {
  registerRoutes(fastify, [...numberEvaluationRoutes, ...languageRoutes]);
};
