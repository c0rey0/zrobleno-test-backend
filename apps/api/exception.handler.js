const { get } = require('lodash');
const errorCodes = require('../../shared/error-codes');
const constants = require('../../shared/constants');

module.exports = async (ctx, next) => {
  try {
    ctx.set({ 'x-api-version': get(process, 'env.API_VERSION', 'none') });
    await next();
  } catch (err) {
    const userLocale = get(ctx.state, 'userLocale', constants.defaultCountryCode);
    /* istanbul ignore next */
    switch (true) {
    case err.name === 'ValidationError':
      ctx.status = 400;
      ctx.body = {
        error: {
          code: 400,
          type: err.name,
          message: 'Validation Exception',
          details: err.details.map(obj => ({
            message: obj.message,
            path: obj.path
          }))
        }
      };
      break;
    case err.name === 'SingleValidationError':
      ctx.status = errorCodes[err.type].statusCode;
      ctx.body = {
        error: {
          code: errorCodes[err.type].statusCode,
          type: err.name,
          header: errorCodes[err.type].locales[userLocale].header,
          message: errorCodes[err.type].locales[userLocale].message
        }
      };
      break;
    case err.name === 'ConflictError':
    case err.name === 'UnauthorizedError':
    case err.name === 'BadRequestError':
    case err.name === 'HttpException':
    case err.name === 'NotFoundError':
      ctx.status = err.statusCode;
      ctx.body = {
        error: {
          code: err.statusCode, type: err.name, message: err.message
        }
      };
      break;
    case err.name === 'Error':
    default:
      ctx.status = 500;
      ctx.body = { error: { code: 500, type: 'ServerError', message: 'Ooooops! Something went wrong' } };
      break;
    }

    // eslint-disable-next-line no-console
    console.log('exception.handler.js -> ', err.message, err.stack);
  }
};
