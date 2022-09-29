

const Ajv = require('ajv');

const schemaCompilers = {
  body: new Ajv({
    removeAdditional: false,
    coerceTypes: false,
    allErrors: true,
  }),
  params: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true,
  }),
  querystring: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true,
  }),
  headers: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true,
  }),
};

module.exports = fastify => {
  fastify.setValidatorCompiler(req => {
    if (!req.httpPart) {
      throw new Error('Missing httpPart');
    }
    const compiler = schemaCompilers[req.httpPart];
    if (!compiler) {
      throw new Error(`Missing compiler for ${req.httpPart}`);
    }
    return compiler.compile(req.schema);
  });
};
