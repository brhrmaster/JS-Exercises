module.exports = {
  querystring: {
    type: 'object',
    properties: {
      language: { type: 'string' },
    },
    required: ['language'],
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
