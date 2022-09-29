const requestHandlerWrapper = ({
  errorHandler,
}) => {
  const responseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': true,
  };

  const handleRequest = async ({
    payload,
    request,
    reply,
    adapterFunction,
  }) => {
    const {
      headers,
    } = request;

    try {
      return adapterFunction({
        payload,
        headers,
        onSuccess: (data, statusCode = 200) => reply
          .code(statusCode)
          .headers({ ...responseHeaders, ...headers })
          .send(JSON.stringify(data)),
        onError: error => {
          const errorHandled = errorHandler(error);
          return reply
            .code(error.statusCode || 500)
            .headers({ ...responseHeaders, ...headers })
            .send(JSON.stringify(errorHandled));
        },
      });
    } catch (error) {
      const errorHandled = errorHandler(error);
      return reply
        .code(error.statusCode || 500)
        .headers({ ...responseHeaders, ...headers })
        .send(JSON.stringify(errorHandled));
    }
  };

  return handleRequest;
};

module.exports = requestHandlerWrapper;
