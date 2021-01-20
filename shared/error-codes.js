const constants = require('./constants');

const {
  defaultCountryCode
} = constants;

const errors = {
  [constants.ERROR_UNAUTHORIZED]: {
    statusCode: 401,
    locales: {
      [defaultCountryCode]: {
        header: 'Error',
        message: 'Unauthorized'
      },
    }
  },
  [constants.ERROR_FORBIDDEN]: {
    statusCode: 403,
    locales: {
      [defaultCountryCode]: {
        header: 'Error',
        message: 'Forbidden'
      },
    }
  },
};

module.exports = errors;
