Cypress.Commands.add('myCRMVisitPage', (url = '') => {
  const baseURL = Cypress.env('BASE_URL');
  cy.visit(`${baseURL}${url}`);
});

Cypress.Commands.add('testUsersKnownValues', () => {
  cy.route('GET', `/GetUserInfo`).as('GetUserInfo');
});

Cypress.Commands.add('testUserData', ({ results, expected, user }) => {
  const { userDetails } = user;
  const {
    BusinessUnitName,
    ReportingStateName,
    FirstName,
    BrokerRegionalization,
  } = results.responseBody;
  expect(BusinessUnitName).to.equal(expected.BusinessUnitName);
  expect(ReportingStateName).to.equal(expected.ReportingStateName);
  expect(FirstName).to.equal(userDetails.FirstName);
  expect(BrokerRegionalization).to.deep.equal(expected.BrokerRegionalization);
});
