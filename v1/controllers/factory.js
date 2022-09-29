const numberEvaluationController = require('./numberEvaluationController');
const languageController = require('./languageController');

module.exports = (adapters, commons, config) => ({
  getNumberList: numberEvaluationController(adapters, commons, config).getNumberList,
  getTotalCountries: languageController(adapters, commons, config).getTotalCountries,
  getCountryWithMostLanguagesByLanguage: languageController(adapters, commons, config).getCountryWithMostLanguagesByLanguage,
  getTotalLanguages: languageController(adapters, commons, config).getTotalLanguages,
  getCountryWithMoreLanguages: languageController(adapters, commons, config).getCountryWithMoreLanguages,
  getMostCommonLanguages: languageController(adapters, commons, config).getMostCommonLanguages,
});
