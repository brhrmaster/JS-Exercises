const controllers = require('../controllers');
const { getNumberListSchema } = require('../schemas');

const tags = ['v1'];

module.exports = [
  {
    method: 'GET',
    url: '/v1/ms-js-exercises/get-number-list/:startNumber/:endNumber',
    schema: {
      tags: [...tags],
      summary: 'Get list of number mixing with text substitution',
      description: 'Return the list of number with mixed text',
      ...getNumberListSchema,
    },
    handler: controllers.getNumberList,
  },
];
