module.exports = function SingleValidationError(type) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.type = type;
};

require('util').inherits(module.exports, Error);
