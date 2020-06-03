/// <reference types="cypress" />

let text = '';
context('Game Plan Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/sample_page/index.html');
  });
  it('tests a pdf', () => {
    cy.task('getPdfContent', 'GamePlan.pdf').then((content) => {
      console.log(content.text);
      cy.get('.preview')
        .type(content.text)
        .then(() => {
          const containing = () => {
            return content.text;
          };
          cy.wrap({ name: containing })
            .invoke('name')
            .should(
              'contain',
              'More, a little more text. The end, and just as well'
            );
        });
    });
  });
});
