const wrapper = ({
  adapters,
  requestHandler,
}) => {
  const getTotalCountries = async (request, reply) => {
    const start = new Date();

    const payload = {
      ...request.query,
      ...request.params,
      ...request.headers,
    };

    await requestHandler({
      start,
      payload,
      request,
      reply,
      adapterFunction: adapters.getTotalCountries,
    });
  };

  const getCountryWithMostLanguagesByLanguage = async (request, reply) => {
    const start = new Date();

    const payload = {
      ...request.query,
      ...request.params,
      ...request.headers,
    };

    await requestHandler({
      start,
      payload,
      request,
      reply,
      adapterFunction: adapters.getCountryWithMostLanguagesByLanguage,
    });
  };

  const getTotalLanguages = async (request, reply) => {
    const start = new Date();

    const payload = {
      ...request.query,
      ...request.params,
      ...request.headers,
    };

    await requestHandler({
      start,
      payload,
      request,
      reply,
      adapterFunction: adapters.getTotalLanguages,
    });
  };

  const getCountryWithMoreLanguages = async (request, reply) => {
    const start = new Date();

    const payload = {
      ...request.query,
      ...request.params,
      ...request.headers,
    };

    await requestHandler({
      start,
      payload,
      request,
      reply,
      adapterFunction: adapters.getCountryWithMoreLanguages,
    });
  };

  const getMostCommonLanguages = async (request, reply) => {
    const start = new Date();

    const payload = {
      ...request.query,
      ...request.params,
      ...request.headers,
    };

    await requestHandler({
      start,
      payload,
      request,
      reply,
      adapterFunction: adapters.getMostCommonLanguages,
    });
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
