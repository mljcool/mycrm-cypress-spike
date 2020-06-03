/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const repoRoot = path.join(__dirname, '..', '..'); // assumes pdf at project root
const pdf2html = require('pdf2html');

const parsePdf = async (pdfName) => {
  const pdfPathname = path.join(repoRoot, pdfName);
  let dataBuffer = fs.readFileSync(pdfPathname);
  return await pdf(dataBuffer); // use async/await since pdf returns a promise
};

const praseToHTML = async (pdfFile) => {
  return new Promise((resolve) => {
    pdf2html.text(pdfFile, (err, html) => {
      resolve(html);
    });
  });
};

module.exports = (on, config) => {
  on('task', {
    getPdfContent(pdfName) {
      return parsePdf(pdfName); //just a placeholder
    },
    pdfToHTML(pdfName) {
      console.log('here');
      return praseToHTML(pdfName); //just a placeholder
    },
  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
