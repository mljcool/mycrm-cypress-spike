/// <reference types="cypress" />

describe('myCrm ACL test process', () => {
  beforeEach(() => {
    const username = Cypress.env('USERNAME');
    cy.loginOkta({ username });
  });
  it('should Generate Game Plan PDF', () => {
    cy.fixture('ACL-scenerios').then((response) => {
      const {
        GetBrokerBasicInfo,
        LoanId,
        ClientId,
        adviserOrganizationId,
        LoanScenarioId,
      } = response;
      cy.server();

      cy.route('GET', `/GetUserInfo`).as('GetUserInfo');
      cy.route('GET', `/features-and-subscriptions`).as('FeatureSubs');
      cy.route('GET', `/GetBrokerBasicInfo`).as('GetBrokerBasicInfo');
      cy.route(
        'GET',
        `/LoanScenario/LoanSummary?loanApplicationId=${LoanScenarioId}`,
      ).as('GetLoanScenarioSummary');
      cy.route(
        'GET',
        `/LoanScenario/ScenarioDetailsGet?loanScenarioId=${LoanScenarioId}`,
      ).as('GetScenarioDetailsGet');

      cy.route(
        'GET',
        `/corporate/AdviserOrganizationGet?adviserOrgComplianceId=0&adviserOrganizationId=${adviserOrganizationId}`,
      ).as('GetLoanSummary');

      cy.route(
        'GET',
        `/Serviceability/FundingCalculatorNewBrokerEventForScenarioGet?loanScenarioID=${LoanScenarioId}`,
      ).as('GetServiceability');

      cy.route(
        'GET',
        `LoanScenario/LoanDetailsGet?loanApplicationId=${LoanScenarioId}`,
      ).as('GetLoanDetails');

      cy.route('GET', `contacts/${ClientId}/SubscriptionInfo`).as(
        'GetSubscriptionInfo',
      );

      cy.route(
        'GET',
        `game-plan/adviser/${ClientId}/settings?loanApplicationId=${LoanScenarioId}`,
      ).as('GetGamePlanAdviser');

      cy.route('POST', `game-plan/${LoanScenarioId}/download`).as(
        'SetGamePlanDownload',
      );

      // cy.visit(
      //   '/#/app/opportunity/fact-find?opportunityId=${loanScenarioId}&loanId=1538235&sourceFamilyId=2803079&isContactOpener=false',
      // );
      cy.visit(`/#/app/loan-application/2803079/${LoanScenarioId}`);
      cy.wait(2000);
      cy.wait('@FeatureSubs');
      cy.wait('@GetUserInfo').should((result) => {
        const { response } = result;
        expect(response.body).to.have.property('BusinessUnitName');
      });
      cy.wait('@GetBrokerBasicInfo').should((result) => {
        const { response } = result;
        expect(response).to.have.deep.property('body', GetBrokerBasicInfo);
      });
      cy.wait('@GetLoanSummary').its('requestBody').should('be.null');
      cy.wait('@GetScenarioDetailsGet').should((result) => {
        const { response } = result;
        expect(response.body.LoanId).to.equal(LoanId);
      });
      cy.wait('@GetLoanScenarioSummary');
      cy.get('.game-plan-btn').click({ force: true });
      cy.wait('@GetServiceability');
      cy.wait('@GetLoanDetails');
      cy.get('.mc-button').click({ force: true });
      cy.wait('@GetSubscriptionInfo');
      cy.wait('@GetGamePlanAdviser');
      cy.get('.preview  > a').click({ force: true });

      cy.wait('@SetGamePlanDownload').should((result) => {
        const fileName = 'test';
        const filePath = 'cypress/temp/' + fileName + '.pdf';

        cy.writeFile(filePath, result.responseBody.Data.DocumentContent, {
          encoding: 'base64',
          decodeContentFromBase64: true,
        });
      });
    });
  });

  it('Read PDF Content ', () => {
    cy.task('getPdfContent', 'test.pdf').then((content) => {
      expect(content).contains('ABN 12345678987');
      expect(content).contains('Australian Credit Licence 111111');
    });
  });
});
