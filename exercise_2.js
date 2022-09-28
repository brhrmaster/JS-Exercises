// ------------ Exercise 2 -----------------------------------------------------------------

// input
const languages = [
	{
		country:"US",
		languages: ["en"]
	},
	{
		country:"BE",
		languages: ["nl","fr","de"]
	},
	{
		country:"NL",
		languages: ["nl","fy"]
	},
	{
		country:"DE",
		languages: ["de"]
	},
	{
		country:"ES",
		languages: ["es"]
	}
];


// ---------------------------------------------------------------------------------------------
// returns the number of countries in the world
const getTotalCountries = list => (new Set(
  list.map(currentItem => [currentItem.country])
      .reduce((prev, current) => {
        return current ? prev.concat(current) : prev;
      })
)).size;


// ---------------------------------------------------------------------------------------------
// finds the country with the most official languages, where they officially speak German (de).
const getCountryWithMostLanguagesByLanguage = (languageList, langSearch) => {
  if (!languageList || languageList.length === 0 || !langSearch) return {};

  const compareByTotalLang = (a, b) => {
    if (a.totalLang > b.totalLang) return 1;
    if (a.totalLang < b.totalLang) return -1;
    return 0;
  };

  const testItem = item => RegExp(langSearch,'i').test(item);

	const { country, languages } = languageList.map(item => ({
    totalLang: item.languages?.length || 0,
    country: item.country,
    languages: item.languages
  }))
  .filter(item => item.languages && item.languages.some(item => testItem(item)))
  .sort(compareByTotalLang)
  .pop();

  return { country, languages };
};



// ---------------------------------------------------------------------------------------------
// that counts all the official languages spoken in the listed countries
const getTotalLanguages = list => (new Set(
    list.map(currentItem => currentItem.languages)
        .reduce((prev, current) => {
          return current ? prev.concat(current) : prev;
        })
  )).size;



// ---------------------------------------------------------------------------------------------
// to find the country with the highest number of official languages.
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



// ---------------------------------------------------------------------------------------------
// to find the most common official language(s), of all countries.
const getMostCommonLanguages = list => {
  const ocurrencies = {};
  let commons = [];

  const allLanguages = list.map(currentItem => Array.from(new Set(currentItem.languages))).reduce((prev, current) => {
        return current ? prev.concat(current) : prev;
      });

  allLanguages.forEach(lang => {
    if (!ocurrencies[lang]) {
      ocurrencies[lang] = 1;
    } else {
      ocurrencies[lang] += 1;
    }

    const newItem = { 
      language: lang, 
      total: ocurrencies[lang]
    };

    if (commons.length === 0) {
      commons.push(newItem);
    } else {

      const currentlyMoreCommon = commons.find(currentlyCommon => currentlyCommon.total >= newItem.total);

      if (!currentlyMoreCommon
        || currentlyMoreCommon
        && newItem.total > currentlyMoreCommon.total) {

          commons = [newItem];

      } else if (currentlyMoreCommon
        && newItem.total === currentlyMoreCommon.total) {

          commons.push(newItem);
      }
    }
  });

  return commons;
};


console.log('Total countries:');
console.log(getTotalCountries(languages));

console.log('the country with the most official languages, where they officially speak German (de):');
console.log(getCountryWithMostLanguagesByLanguage(languages, 'de'));

console.log('Total of official languages spoken in the listed countries');
console.log(getTotalLanguages(languages));

console.log('The country with the highest number of official languages');
console.log(getCountryWithMoreLanguages(languages));

console.log('The most common official language(s), of all countries are:');
console.log(getMostCommonLanguages(languages));
