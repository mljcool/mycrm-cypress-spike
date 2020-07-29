/// <reference types="cypress" />

describe('myCrm Known NZ users', () => {
  beforeEach(() => {
    cy.server();
    cy.testUsersKnownValues();
  });
  it('Login NZ user michelle@nzfsg.co.nz', () => {
    cy.fixture('nz-users').then(({ userOne, expected }) => {
      const { username } = userOne.userDetails;
      cy.loginOkta({ username });
      cy.visit('/');
      cy.wait('@GetUserInfo').should((results) => {
        const user = userOne;
        cy.testUserData({ results, expected, user });
      });
    });
  });

  it('Login NZ user brian.greer@nzfsg.co.nz', () => {
    cy.fixture('nz-users').then(({ userTwo, expected }) => {
      const { username } = userTwo.userDetails;
      cy.loginOkta({ username });
      cy.visit('/');
      cy.wait('@GetUserInfo').should((results) => {
        const user = userTwo;
        cy.testUserData({ results, expected, user });
      });
    });
  });

  afterEach(() => {
    cy.signOutOkta();
  });
});
