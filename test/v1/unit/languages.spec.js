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

describe('Unit tests for language useCases', () => {
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

  context('Checking data from language list Test Cases', () => {

    context('Success', () => {
      it('Should return total countries', async () => {
        const languages = [
          {
            country: 'US',
            languages: ['en'],
          },
          {
            country: 'BE',
            languages: ['nl', 'fr', 'de'],
          },
          {
            country: 'NL',
            languages: ['nl', 'fy'],
          },
        ];
        mockDependencies.repository.languageRepository.getAll = sinon.spy(() => Promise.resolve(languages));
        const response = await adapters(mockDependencies).getTotalCountries(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(enums.RESPONSE_MESSAGES.GET_TOTAL_COUNTRIES);
        expect(response.data).to.be.eq(3);
      });

      it('Should the country with the most official languages filtered', async () => {
        const languages = [
          {
            country: 'US',
            languages: ['en'],
          },
          {
            country: 'NL',
            languages: ['nl', 'fy', 'de'],
          },
          {
            country: 'BE',
            languages: ['nl', 'fr', 'de'],
          },
          {
            country: 'CH',
          },
          {
            country: 'RU',
            languages: [],
          },
        ];

        request.payload = {
          language: 'nl',
        };

        mockDependencies.repository.languageRepository.getAll = sinon.spy(() => Promise.resolve(languages));
        const response = await adapters(mockDependencies).getCountryWithMostLanguagesByLanguage(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(`${enums.RESPONSE_MESSAGES.GET_COUNTRY_WITH_MOST_LANG} nl`);
        expect(response.data).to.be.deep.equal({
          country: 'BE',
          languages: ['nl', 'fr', 'de'],
        });
      });

      it('Should empty result when search the country with the most official languages filtered passing no language', async () => {
        const languages = [
          {
            country: 'NL',
            languages: ['nl', 'fy'],
          },
        ];

        request.payload = {
          language: '',
        };

        mockDependencies.repository.languageRepository.getAll = sinon.spy(() => Promise.resolve(languages));
        const response = await adapters(mockDependencies).getCountryWithMostLanguagesByLanguage(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(`${enums.RESPONSE_MESSAGES.GET_COUNTRY_WITH_MOST_LANG} `);
        expect(response.data).to.be.deep.equal({});
      });

      it('Should Total Languages', async () => {
        const languages = [
          {
            country: 'NL',
            languages: ['nl', 'fy'],
          },
        ];

        mockDependencies.repository.languageRepository.getAll = sinon.spy(() => Promise.resolve(languages));
        const response = await adapters(mockDependencies).getTotalLanguages(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(enums.RESPONSE_MESSAGES.GET_TOTAL_OFFICIAL_LANG);
        expect(response.data).to.be.eq(2);
      });

      it('Should return Country With More Languages', async () => {
        const languages = [
          {
            country: 'US',
            languages: ['en'],
          },
          {
            country: 'BE',
            languages: ['nl', 'fr', 'de'],
          },
          {
            country: 'NL',
            languages: ['nl', 'fy'],
          },
          {
            country: 'CH',
          },
          {
            country: 'RU',
            languages: [],
          },
        ];

        mockDependencies.repository.languageRepository.getAll = sinon.spy(() => Promise.resolve(languages));
        const response = await adapters(mockDependencies).getCountryWithMoreLanguages(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(enums.RESPONSE_MESSAGES.GET_COUNTRY_WITH_HIGHEST_NUM_OF_LANGS);
        expect(response.data).to.be.deep.equal({
          country: 'BE',
          languages: ['nl', 'fr', 'de'],
        });
      });

      it('Should return Most Common Languages', async () => {
        const languages = [
          {
            country: 'US',
            languages: ['en'],
          },
          {
            country: 'BE',
            languages: ['nl', 'fr', 'de'],
          },
          {
            country: 'NL',
            languages: ['nl', 'fy'],
          },
        ];

        mockDependencies.repository.languageRepository.getAll = sinon.spy(() => Promise.resolve(languages));
        const response = await adapters(mockDependencies).getMostCommonLanguages(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(200);
        expect(response.message).to.be.eq(enums.RESPONSE_MESSAGES.GET_MOST_OFFICIAL_LANGS);
        expect(response.data).to.be.deep.equal([{
          language: 'nl',
          total: 2,
        }]);
      });

      it('Should check comparator method', async () => {
        expect(useCases.languagesUseCase.compareByTotalLang({ totalLang: 1 }, { totalLang: 2 })).to.be.eq(-1);
        expect(useCases.languagesUseCase.compareByTotalLang({ totalLang: 2 }, { totalLang: 1 })).to.be.eq(1);
        expect(useCases.languagesUseCase.compareByTotalLang({ totalLang: 1 }, { totalLang: 1 })).to.be.eq(0);
      });
    });

    context('Error Handling', () => {
      it('Should return 404 when getting total countries [empty]', async () => {
        const response = await adapters(mockDependencies).getTotalCountries(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(404);
        expect(response.message).to.be.eq('Error: No data');
      });
      it('Should return 404 when getting country With Most Languages By Language [empty]', async () => {
        const response = await adapters(mockDependencies).getCountryWithMostLanguagesByLanguage(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(404);
        expect(response.message).to.be.eq('Error: No data');
      });
      it('Should return 404 when getting Total Languages [empty]', async () => {
        const response = await adapters(mockDependencies).getTotalLanguages(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(404);
        expect(response.message).to.be.eq('Error: No data');
      });
      it('Should return 404 when getting country With More Languages [empty]', async () => {
        const response = await adapters(mockDependencies).getCountryWithMoreLanguages(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(404);
        expect(response.message).to.be.eq('Error: No data');
      });
      it('Should return 404 when getting Most Common Languages [empty]', async () => {
        const response = await adapters(mockDependencies).getMostCommonLanguages(request);
        expect(response).to.be.an('object');
        expect(response.statusCode).to.be.eq(404);
        expect(response.message).to.be.eq('Error: No data');
      });
    });
  });

});
