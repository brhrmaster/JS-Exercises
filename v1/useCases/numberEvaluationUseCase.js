const numberEvaluationUseCase = () => {

  const isDivisibleBy3 = value => value % 3 === 0;
  const isDivisibleBy5 = value => value % 5 === 0;
  const isDivisibleBy3And5 = value => isDivisibleBy3(value) && isDivisibleBy5(value);

  const getEvaluatedResult = ({
    value,
    textA,
    textB,
  }) => {
    if (isDivisibleBy3And5(value)) return `${textA} ${textB}`;
    if (isDivisibleBy3(value)) return textA;
    if (isDivisibleBy5(value)) return textB;

    return value;
  };

  const generateNumberList = ({
    startNumber,
    endNumber,
  }) => {
    const sourceData = [];

    if (startNumber === 0 && endNumber === 0) return sourceData;

    if (startNumber > endNumber) {
      for (let i = startNumber; i >= endNumber; i--) {
        sourceData.push(i);
      }
    } else {
      for (let i = startNumber; i <= endNumber; i++) {
        sourceData.push(i);
      }
    }

    return sourceData;
  };

  return {
    getEvaluatedResult,
    generateNumberList,
  };
};

module.exports = numberEvaluationUseCase();
