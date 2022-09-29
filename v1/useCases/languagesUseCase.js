const languageWrapper = () => {

  const concatArrays = (arr1, arr2) => arr1.concat(arr2);
  const compareByTotalLang = (a, b) => {
    if (a.totalLang > b.totalLang) return 1;
    if (a.totalLang < b.totalLang) return -1;
    return 0;
  };

  const getTotalCountries = list => (new Set(
    list.map(currentItem => [currentItem.country]).reduce(concatArrays),
  )).size;

  const getCountryWithMostLanguagesByLanguage = (languageList, langSearch) => {
    if (!languageList || languageList.length === 0 || !langSearch) return {};

    const checkLang = lang => RegExp(langSearch, 'i').test(lang);

    const { country, languages } = languageList.map(item => ({
      totalLang: item.languages?.length || 0,
      country: item.country,
      languages: item.languages || [],
    }))
      .filter(item => item.languages && item.languages.some(lang => checkLang(lang)))
      .sort(compareByTotalLang)
      .pop();

    return { country, languages };
  };

  const getTotalLanguages = list => (new Set(
    list.map(currentItem => currentItem.languages).reduce(concatArrays),
  )).size;

  const getCountryWithMoreLanguages = list => {
    let higherTotalLang = 0;
    let countryWithMoreLang = null;
    list.forEach(currentItem => {
      const currentTotalLang = currentItem.languages?.length || 0;
      if (currentTotalLang > higherTotalLang) {
        higherTotalLang = currentTotalLang;
        countryWithMoreLang = currentItem;
      }
    });

    return countryWithMoreLang;
  };

  const getMostCommonLanguages = languageList => {
    const ocurrencies = {};
    let commons = [];

    const allLanguages = languageList.map(currentItem => Array.from(new Set(currentItem.languages))).reduce(concatArrays);

    allLanguages.forEach(lang => {
      if (!ocurrencies[lang]) {
        ocurrencies[lang] = 1;
      } else {
        ocurrencies[lang] += 1;
      }

      const newItem = {
        language: lang,
        total: ocurrencies[lang],
      };

      if (commons.length === 0) {
        commons.push(newItem);
      } else {

        const currentlyMoreCommon = commons.find(currentlyCommon => currentlyCommon.total >= newItem.total);

        if (!currentlyMoreCommon
          || (currentlyMoreCommon && newItem.total > currentlyMoreCommon.total)) {

          commons = [newItem];

        } else if (currentlyMoreCommon
          && newItem.total === currentlyMoreCommon.total) {

          commons.push(newItem);
        }
      }
    });

    return commons;
  };

  return {
    getTotalCountries,
    getCountryWithMostLanguagesByLanguage,
    getTotalLanguages,
    getCountryWithMoreLanguages,
    getMostCommonLanguages,
    compareByTotalLang,
  };
};

module.exports = languageWrapper();
