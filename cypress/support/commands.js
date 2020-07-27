Cypress.Commands.add('myCRMVisitPage', (url = '') => {
  const baseURL = Cypress.env('BASE_URL');
  cy.visit(`${baseURL}${url}`);
});
