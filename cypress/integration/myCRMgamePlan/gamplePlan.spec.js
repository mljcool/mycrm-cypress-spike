/// <reference types="cypress" />

describe('MyCRM Gamplan Test', () => {
  beforeEach(() => {
    cy.machineUser();
  });
  it('login and navigate in game plan', () => {
    cy.fixture('scenario-data').then(({ familyId, loanAppId, adviserId }) => {
      cy.getSampleLoanApp(familyId, loanAppId);
      cy.waitForAPIResponse(loanAppId);
      cy.wait('@GetUserInfo');
      cy.wait('@ScenarioApplicantListGet');

      cy.get('.run-serviceability')
        .last()
        .click();
      cy.getLoanDetailsGet(loanAppId);
      cy.wait('@getLoanDetailsGet');
      cy.get('.owner ').should('contain', 'Matthew AXXs & Kelley RXXXXXXs');
      cy.get('.mc-button ').click();
      cy.getLoanScenario(adviserId);
      cy.wait('@getLoanScenario');
      cy.getAdviserInfo(adviserId);
      cy.task('pdfToHTML', 'GamePlanSample.pdf').then((content) => {
        cy.writeFile('./sampleFiles/pdf.txt', content);
        cy.readFile('./sampleFiles/pdf.txt').then((text) => {
          const adviserData = JSON.parse(
            window.localStorage.getItem('adviserInfo')
          );
          console.log(adviserData);
          expect(text).contains(adviserData.ASICID); // true
        });
      });
    });
  });
});
