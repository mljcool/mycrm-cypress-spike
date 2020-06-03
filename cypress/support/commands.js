Cypress.Commands.add('machineUser', () => {
  cy.request({
    method: 'POST',
    url: `https://sit-api.nzfsg.co.nz/Login?Authorization=Bearer dsadsadsa&username=leads.api@loanmarket.com&password=YunK2PA{kj@=b`,
    headers: {
      username: 'leads.api@loanmarket.com',
      password: 'YunK2PA{kj@=b',
      Authorization: `Bearer {{accessToken}}`,
    },
  }).then((resp) => {
    window.localStorage.setItem('myCRM_jwt', `Bearer ${resp.body}`);
  });
});

Cypress.Commands.add('loginUser', () => {
  cy.get('input[type=email]')
    .focus()
    .type('leads.api@loanmarket.com', {
      delay: 100,
    });
  cy.get('input[type=password]')
    .focus()
    .type('YunK2PA{kj@=b', { delay: 100 })
    .type('{enter}');
});
