const wrapper = ({
  enums,
  useCases: {
    numberEvaluationUseCase,
  },
}) => {
  const getNumberList = ({
    onSuccess,
    onError,
    payload: {
      startNumber,
      endNumber,
      textA,
      textB,
    },
  }) => {
    try {
      let sourceData = numberEvaluationUseCase.generateNumberList({
        startNumber,
        endNumber,
      });

      sourceData = sourceData.map(value => numberEvaluationUseCase.getEvaluatedResult({
        value,
        textA,
        textB,
      }));

      const result = {
        message: enums.RESPONSE_MESSAGES.GET_NUMBER_LIST_SUCCESS_MESSAGE,
        data: sourceData,
      };

      return onSuccess(result, enums.STATUS_CODE.OK);
    } catch (error) {
      return onError({
        message: `Error: ${error.message}`,
        additionalData: {
          ...error.additionalData,
        },
        statusCode: error.statusCode || 500,
        error,
      });
    }
  };

  return {
    getNumberList,
  };
};

module.exports = wrapper;
