const dotenvPlugin = require('cypress-dotenv');

/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  config = dotenvPlugin(config, null, true);
  const { env, fixturesFolder } = config;
  config.baseURL = env.BASE_URL;
  config.fixturesFolder = `${fixturesFolder}\\${env.TARGET_ENV}`;
  return config;
};
