const wrapper = ({
  enums,
  repository: {
    languageRepository,
  },
  useCases: {
    languagesUseCase,
  },
}) => {
  const checkEmptyList = list => {
    if (!list || (Array.isArray(list) && list.length === 0)) {
      const error = new Error('No data');
      error.statusCode = 404;
      throw error;
    }
  };

  const getTotalCountries  = async ({
    onSuccess,
    onError,
  }) => {
    try {

      const languageList = await languageRepository.getAll();

      checkEmptyList(languageList);

      const totalCountries = languagesUseCase.getTotalCountries(languageList);

      const result = {
        message: enums.RESPONSE_MESSAGES.GET_TOTAL_COUNTRIES,
        data: totalCountries,
      };

      return onSuccess(result, enums.STATUS_CODE.OK);
    } catch (error) {
      return onError({
        message: `Error: ${error.message}`,
        additionalData: {
          ...error.additionalData,
        },
        statusCode: error.statusCode,
        error,
      });
    }
  };

  const getCountryWithMostLanguagesByLanguage = async ({
    onSuccess,
    onError,
    payload: {
      language: query,
    },
  }) => {
    try {

      const languageList = await languageRepository.getAll();

      checkEmptyList(languageList);

      const countryWithMostLanguagesByLanguage = languagesUseCase.getCountryWithMostLanguagesByLanguage(languageList, query);

      const result = {
        message: `${enums.RESPONSE_MESSAGES.GET_COUNTRY_WITH_MOST_LANG} ${query}`,
        data: countryWithMostLanguagesByLanguage,
      };

      return onSuccess(result, enums.STATUS_CODE.OK);
    } catch (error) {
      return onError({
        message: `Error: ${error.message}`,
        additionalData: {
          ...error.additionalData,
        },
        statusCode: error.statusCode,
        error,
      });
    }
  };

  const getTotalLanguages = async ({
    onSuccess,
    onError,
  }) => {
    try {

      const languageList = await languageRepository.getAll();

      checkEmptyList(languageList);

      const totalLanguages = languagesUseCase.getTotalLanguages(languageList);

      const result = {
        message: enums.RESPONSE_MESSAGES.GET_TOTAL_OFFICIAL_LANG,
        data: totalLanguages,
      };

      return onSuccess(result, enums.STATUS_CODE.OK);
    } catch (error) {
      return onError({
        message: `Error: ${error.message}`,
        additionalData: {
          ...error.additionalData,
        },
        statusCode: error.statusCode,
        error,
      });
    }
  };

  const getCountryWithMoreLanguages = async ({
    onSuccess,
    onError,
  }) => {
    try {

      const languageList = await languageRepository.getAll();

      checkEmptyList(languageList);

      const countryWithMoreLanguages = languagesUseCase.getCountryWithMoreLanguages(languageList);

      const result = {
        message: enums.RESPONSE_MESSAGES.GET_COUNTRY_WITH_HIGHEST_NUM_OF_LANGS,
        data: countryWithMoreLanguages,
      };

      return onSuccess(result, enums.STATUS_CODE.OK);
    } catch (error) {
      return onError({
        message: `Error: ${error.message}`,
        additionalData: {
          ...error.additionalData,
        },
        statusCode: error.statusCode,
        error,
      });
    }
  };

  const getMostCommonLanguages = async ({
    onSuccess,
    onError,
  }) => {
    try {

      const languageList = await languageRepository.getAll();

      checkEmptyList(languageList);

      const mostCommonLanguages = languagesUseCase.getMostCommonLanguages(languageList);

      const result = {
        message: enums.RESPONSE_MESSAGES.GET_MOST_OFFICIAL_LANGS,
        data: mostCommonLanguages,
      };

      return onSuccess(result, enums.STATUS_CODE.OK);
    } catch (error) {
      return onError({
        message: `Error: ${error.message}`,
        additionalData: {
          ...error.additionalData,
        },
        statusCode: error.statusCode,
        error,
      });
    }
  };


  return {
    getTotalCountries,
    getCountryWithMostLanguagesByLanguage,
    getTotalLanguages,
    getCountryWithMoreLanguages,
    getMostCommonLanguages,
  };
};

module.exports = wrapper;
