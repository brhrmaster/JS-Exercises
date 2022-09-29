const languagesAdapter = require('./languageAdapter');
const numberEvaluationAdapter = require('./numberEvaluationAdapter');

module.exports = dependencies => ({
  getNumberList: numberEvaluationAdapter(dependencies).getNumberList,
  getTotalCountries: languagesAdapter(dependencies).getTotalCountries,
  getCountryWithMostLanguagesByLanguage: languagesAdapter(dependencies).getCountryWithMostLanguagesByLanguage,
  getTotalLanguages: languagesAdapter(dependencies).getTotalLanguages,
  getCountryWithMoreLanguages: languagesAdapter(dependencies).getCountryWithMoreLanguages,
  getMostCommonLanguages: languagesAdapter(dependencies).getMostCommonLanguages,
});
