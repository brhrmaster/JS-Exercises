const factory = require('./factory');
const config = require('../../config');
const {
  errorHandler,
  requestHandler: reqHandler,
  enums,
} = require('../../commons/utils');
const useCases = require('../useCases');
const repository = require('../repository');

const adapters = require('../adapters')({
  config,
  enums,
  useCases,
  repository,
});

const requestHandler = reqHandler({
  config,
  errorHandler,
});

module.exports = factory({
  adapters,
  config,
  requestHandler,
});
