const dotenvPlugin = require('cypress-dotenv');
const selectTestsWithGrep = require('cypress-select-tests/grep');

/// <reference types="cypress" />

const pdf2html = require('pdf2html');

const praseToHTML = (pdfFile) => {
  return new Promise((resolve) => {
    pdf2html.text(pdfFile, (err, html) => {
      resolve(html);
    });
  });
};

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  config = dotenvPlugin(config, null, true);
  const { env, fixturesFolder, projectRoot } = config;

  on('file:preprocessor', selectTestsWithGrep(config));
  on('task', {
    getPdfContent(pdfName) {
      const getPDFPath = `${projectRoot}\\cypress\\temp\\${pdfName}`;
      return praseToHTML(getPDFPath);
    },
  });
  config.baseURL = env.BASE_URL;
  config.fixturesFolder = `${fixturesFolder}\\${env.TARGET_ENV}`;
  return config;
};
