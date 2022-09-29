require('dotenv').config();

const serviceName = process.env.SERVICE_NAME || 'ms-js-exercises';

module.exports = {
  application: serviceName,
  environment: process.env.NODE_ENV,
  app: {
    port: process.env.PORT || '80',
  },
  logs: {
    application: serviceName,
    environment: process.env.NODE_ENV,
  },
  stripPrefix: {
    path: `/api/${serviceName.replace(/-/g, '')}`,
  },
};
