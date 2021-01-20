if (process.env.NODE_ENV === undefined) {
  require('./shared/env')();
}

const config = {
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    timezone: 'utc',
    charset: 'utf8mb4'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
};

module.exports = {
  development: config,
  production: config,
  test: config
};
