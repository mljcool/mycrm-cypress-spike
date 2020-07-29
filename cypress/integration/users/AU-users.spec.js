/// <reference types="cypress" />

describe('myCrm Known AU users', () => {
  beforeEach(() => {
    cy.server();
    cy.testUsersKnownValues();
  });

  it('Login AU user helenbrokeracl@gmail.com', () => {
    cy.fixture('au-users').then(({ userOne, expected }) => {
      const { username } = userOne.userDetails;
      cy.loginOkta({ username });
      cy.visit('/');
      cy.wait('@GetUserInfo').should((results) => {
        const user = userOne;
        cy.testUserData({ results, expected, user });
      });
    });
  });

  afterEach(() => {
    cy.signOutOkta();
  });
});
