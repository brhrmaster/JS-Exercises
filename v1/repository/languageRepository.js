// MOCK
const languages = [
  {
    country: 'US',
    languages: ['en'],
  },
  {
    country: 'BE',
    languages: ['nl', 'fr', 'de'],
  },
  {
    country: 'NL',
    languages: ['nl', 'fy'],
  },
  {
    country: 'DE',
    languages: ['de'],
  },
  {
    country: 'ES',
    languages: ['es'],
  },
];

module.exports = {
  getAll: () => Promise.resolve(languages),
};
