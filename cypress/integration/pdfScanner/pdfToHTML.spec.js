/// <reference types="cypress" />

context('Game Plan Test', () => {
  it('tests a pdf', () => {
    cy.task('pdfToHTML', 'GamePlan.pdf').then((content) => {
      console.log(content);
    });
  });
});
