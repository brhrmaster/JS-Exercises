const controllers = require('../controllers');
const {
  genericGetSchema,
  getCountryMostLanguageByLanguageSchema,
} = require('../schemas');

const tags = ['v1'];

module.exports = [
  {
    method: 'GET',
    url: '/v1/ms-js-exercises/get-total-countries',
    schema: {
      tags: [...tags],
      summary: 'Get total of countries',
      description: 'Return the total of countries',
      ...genericGetSchema,
    },
    handler: controllers.getTotalCountries,
  },
  {
    method: 'GET',
    url: '/v1/ms-js-exercises/get-country-with-most-languages',
    schema: {
      tags: [...tags],
      summary: 'Get country with the most official languages',
      description: 'Return the country with the most official languages filtered by a language',
      ...getCountryMostLanguageByLanguageSchema,
    },
    handler: controllers.getCountryWithMostLanguagesByLanguage,
  },
  {
    method: 'GET',
    url: '/v1/ms-js-exercises/get-total-languages',
    schema: {
      tags: [...tags],
      summary: 'Get the total of languages',
      description: 'Return the total of languages',
      ...genericGetSchema,
    },
    handler: controllers.getTotalLanguages,
  },
  {
    method: 'GET',
    url: '/v1/ms-js-exercises/get-country-with-more-languages',
    schema: {
      tags: [...tags],
      summary: 'Get country with more languages',
      description: 'Return the country with more languages',
      ...genericGetSchema,
    },
    handler: controllers.getCountryWithMoreLanguages,
  },
  {
    method: 'GET',
    url: '/v1/ms-js-exercises/get-most-common-languages',
    schema: {
      tags: [...tags],
      summary: 'Get the most common languages',
      description: 'Return the list of most common languages',
      ...genericGetSchema,
    },
    handler: controllers.getMostCommonLanguages,
  },
];
