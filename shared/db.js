const _ = require('lodash');
const knexInstance = require('knex');
const { Model } = require('objection');
const connection = require('../knexfile');

const activeConnection = _.get(process.env, 'NODE_ENV');

const knex = knexInstance(connection[activeConnection]);

if (_.get(process.env, 'LOG_ENABLED', 'false') === 'true') {
  const knexLogger = require('./core/loggers/knex.logger');
  knex.on('query', knexLogger.query);
  knex.on('query-response', knexLogger.query_response);
}

Model.knex(knex);
module.exports = { knex, Model };
