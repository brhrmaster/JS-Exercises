const wrapper = ({
  adapters,
  requestHandler,
}) => {
  const getNumberList = async (request, reply) => {
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
      adapterFunction: adapters.getNumberList,
    });
  };

  return {
    getNumberList,
  };

};

module.exports = wrapper;
