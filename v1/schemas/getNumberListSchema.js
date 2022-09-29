module.exports = {
  querystring: {
    type: 'object',
    properties: {
      textA: { type: 'string' },
      textB: { type: 'string' },
    },
    required: ['textA', 'textB'],
    additionalProperties: false,
  },
  params: {
    type: 'object',
    properties: {
      startNumber: { type: 'number' },
      endNumber: { type: 'number' },
    },
    required: ['startNumber', 'endNumber'],
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
    },
  },
};
