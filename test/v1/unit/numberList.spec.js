const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { enums } = require('../../../commons/utils');
const adapters = require('../../../v1/adapters');
const useCases = require('../../../v1/useCases');

chai.use(chaiAsPromised);
const { expect } = chai;

let mockDependencies;
let request;
const sandbox = sinon.createSandbox();

describe('Unit tests for number evaluation useCases', () => {
  beforeEach(() => {
    mockDependencies = {
      enums,
      useCases,
      repository: {
        languageRepository: {
          getAll: sinon.spy(() => Promise.resolve([])),
        },
      },
    };

    request = {
      payload: {},
      onSuccess: sinon.spy((responseData, statusCode) => ({ ...responseData, statusCode })),
      onError: sinon.spy(errorData => errorData),
    };
  });

  afterEach(() => sandbox.reset());

  context('Number list evaluation Test Cases', () => {

    context('Success', () => {
      it('Should return evaluated number list', () => {
        request.payload = {
          startNumber: 1,
          endNumber: 5,
          textA: 'Visual',
          textB: 'Nuts',
        };

        const resultArray = [1, 2, 'Visual', 4, 'Nuts'];

        const response = adapters(mockDependencies).getNumberList(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(enums.RESPONSE_MESSAGES.GET_NUMBER_LIST_SUCCESS_MESSAGE);
        expect(response.data).to.be.a('array');
        expect(response.data).to.deep.equal(resultArray);
      });

      it('Should return evaluated number for an inverted list', () => {
        request.payload = {
          startNumber: 5,
          endNumber: 1,
          textA: 'Visual',
          textB: 'Nuts',
        };

        const resultArray = ['Nuts', 4, 'Visual', 2, 1];

        const response = adapters(mockDependencies).getNumberList(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(enums.RESPONSE_MESSAGES.GET_NUMBER_LIST_SUCCESS_MESSAGE);
        expect(response.data).to.be.a('array');
        expect(response.data).to.deep.equal(resultArray);
      });

      it('Should return evaluated number list sending 0 interval', () => {
        request.payload = {
          startNumber: 0,
          endNumber: 0,
          textA: 'Visual',
          textB: 'Nuts',
        };

        const resultArray = [];

        const response = adapters(mockDependencies).getNumberList(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(enums.RESPONSE_MESSAGES.GET_NUMBER_LIST_SUCCESS_MESSAGE);
        expect(response.data).to.be.a('array');
        expect(response.data).to.deep.equal(resultArray);
      });

      it('Should return the correct value for given number', () => {
        const response = useCases.numberEvaluationUseCase.getEvaluatedResult({
          value: 999945,
          textA: 'Visual',
          textB: 'Nuts',
        });
        expect(response).to.be.eq('Visual Nuts');
      });

      it('Should return the correct value for given number', () => {
        const response = useCases.numberEvaluationUseCase.getEvaluatedResult({
          value: 999999,
          textA: 'Visual',
          textB: 'Nuts',
        });
        expect(response).to.be.eq('Visual');
      });

      it('Should return the correct value for given number', () => {
        const response = useCases.numberEvaluationUseCase.getEvaluatedResult({
          value: 999991,
          textA: 'Visual',
          textB: 'Nuts',
        });
        expect(response).to.be.eq(999991);
      });

    });

    context('Error Handling', () => {
      it('Should return handled error when getting an exception', () => {
        request.payload = {
        };
        mockDependencies.useCases.numberEvaluationUseCase.generateNumberList = () => {
          throw new Error('Internal server error');
        };
        const response = adapters(mockDependencies).getNumberList(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(500);
        expect(response.message).to.be.eq('Error: Internal server error');
      });
    });
  });

});
