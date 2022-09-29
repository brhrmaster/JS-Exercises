module.exports = {
  querystring: {
    type: 'object',
    properties: {},
    additionalProperties: false,
  },
  params: {
    type: 'object',
    properties: {},
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
    },
  },
};
