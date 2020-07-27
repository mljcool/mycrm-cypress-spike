/// <reference types="cypress" />

describe('myCrm ACL test process', () => {
  beforeEach(() => {
    cy.loginOkta();
  });
  it('should load homepage', () => {
    cy.visit('#/app/home');
    cy.fixture('ACL-scenerios').then((response) => {
      cy.log(response);
    });
  });
});
