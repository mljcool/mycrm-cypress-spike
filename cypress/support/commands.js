Cypress.Commands.add('login', () => {
  cy.wait(1000).then(() => {
    cy.get('input[type=text]').type('brian.greer@loanmarket.co.nz');
    cy.get('input[type=password]').type('YunK2PA{kj@=b');
    cy.get('button').click();
  });
});
