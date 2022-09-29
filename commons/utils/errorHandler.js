const errorHandler = error => ({
  error: {
    type: error.type,
    message: error.message,
    statusCode: error.statusCode || error.serviceStatusCode,
    additionalData: error.additionalData,
  },
});

module.exports = errorHandler;
