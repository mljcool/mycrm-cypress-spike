Cypress.Commands.add('waitForAPIResponse', (loanScenarioId) => {
  cy.server();
  cy.route('GET', 'https://sit-api.nzfsg.co.nz/GetUserInfo').as('GetUserInfo');
  cy.route(
    'GET',
    `https://sit-api.nzfsg.co.nz/LoanScenario/ScenarioApplicantListGet?loanScenarioId=${loanScenarioId}`
  ).as('ScenarioApplicantListGet');
});

Cypress.Commands.add('getSampleLoanApp', (familyId, loanAppId) => {
  cy.visit(
    `http://localhost:8080/#/app/loan-application/${familyId}/${loanAppId}`
  );
});

Cypress.Commands.add('getLoanDetailsGet', (loanApplicationId) => {
  cy.route(
    'GET',
    `https://sit-api.nzfsg.co.nz/LoanScenario/LoanDetailsGet?loanApplicationId=${loanApplicationId}`
  ).as('getLoanDetailsGet');
});

Cypress.Commands.add('getAdviserInfo', (brokerId) => {
  cy.route(
    'GET',
    `https://sit-api.nzfsg.co.nz/contacts/${brokerId}/adviser-info`
  ).as('getAdviserInfo');
});

Cypress.Commands.add('getLoanScenario', (brokerId) => {
  cy.server();
  cy.route(
    'PUT',
    `https://sit-api.nzfsg.co.nz/LoanScenario/RecommendationReportStatus`
  ).as('getLoanScenario');
});

Cypress.Commands.add('getAdviserInfo', (familyId) => {
  cy.request({
    method: 'GET',
    url: `https://sit-api.nzfsg.co.nz/contacts/${familyId}/adviser-info`,
    headers: {
      Authorization: window.localStorage.getItem('myCRM_jwt'),
    },
  }).then((resp) => {
    window.localStorage.setItem('adviserInfo', JSON.stringify(resp.body.Data));

    cy.log(
      'Expect Credit Representative Number should  equal to ' +
        resp.body.Data.ASICID
    );
    cy.log('Preferred FullName ' + resp.body.Data.PreferredFullName);
  });
});
