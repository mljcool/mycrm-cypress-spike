import OktaAuth from '@okta/okta-auth-js';

const OKTA_ISSUER = Cypress.env('OKTA_ISSUER');
const OKTA_CLIENT_ID = Cypress.env('OKTA_CLIENT_ID');
const auth = new OktaAuth({
  issuer: OKTA_ISSUER,
  clientId: OKTA_CLIENT_ID,
  redirectUri: `${window.location.origin}/app/authorization-code/callback`,
  tokenManager: {
    autoRenew: true,
    expireEarlySeconds: Number(60 * 3),
    storageKey: 'mycrm-tokens',
  },
});

Cypress.Commands.add('loginOkta', ({ username }) => {
  const password = Cypress.env('PASSWORD');

  const setTokens = (data) => {
    const { tokens } = data;

    if (tokens && tokens.idToken) {
      auth.tokenManager.add('id_token', tokens.idToken);
    }
    if (tokens && tokens.accessToken) {
      auth.tokenManager.add('access_token', tokens.accessToken);
    }
  };

  const fetchToken = (sessionToken) => {
    return auth.token.getWithoutPrompt({
      sessionToken,
      scopes: ['openid', 'profile', 'email'],
    });
  };

  auth
    .signIn({ username, password })
    .then(async (transaction) => {
      if (transaction.status === 'SUCCESS') {
        const tokens = await fetchToken(transaction.sessionToken);
        setTokens(tokens);
      } else {
        throw 'We cannot handle the ' + transaction.status + ' status';
      }
    })
    .catch((err) => console.log(err));
});

Cypress.Commands.add('signOutOkta', () => {
  const token = auth.tokenManager.get('access_token');

  auth.signOut({
    accessToken: token,
  });
});
