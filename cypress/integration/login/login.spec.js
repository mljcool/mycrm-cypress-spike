/// <reference types="cypress" />

describe('login CRM sample', () => {
  beforeEach(() => {
    cy.visit('/app/login');
  });
  it('should ', () => {
    cy.login();
  });
});
