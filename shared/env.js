/* eslint-disable no-console */
const dotenv = require('dotenv');
const path = require('path');

/**
 * @param name {String} - filename origin .env
 * @param nameDist {String} - name of example .env file
 */
module.exports = (name = '.env', nameDist = '.env.dist') => {
  const env = dotenv.config({ path: path.resolve(process.cwd(), `${name}`) });
  const distEnv = dotenv.config({ path: path.resolve(process.cwd(), `${nameDist}`) });

  /* istanbul ignore if */
  if (distEnv.error) {
    console.error(`error: ${nameDist} not found and can't be parsed`);
    process.exit(1);
  }
  /* istanbul ignore if */
  if (env.error) {
    console.error(`error: ${name} not found and can't be parsed`);
    process.exit(1);
  }

  const keysFromDistFile = Object.keys(distEnv.parsed);
  const keysFromEnvFile = Object.keys(env.parsed);

  const mev = keysFromDistFile.filter(i => keysFromEnvFile.indexOf(i) === -1);
  /* istanbul ignore if */
  if (mev.length) {
    console.error(`Error: Missed .env variables: ${mev.join(', ')}`);
    process.exit(1);
  }
};
