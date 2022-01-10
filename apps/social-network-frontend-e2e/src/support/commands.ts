// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
import { OktaAuth } from '@okta/okta-auth-js';

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

// Okta
Cypress.Commands.add('loginByOktaApi', (username, password) => {
  const log = Cypress.log({
    displayName: 'OKTA LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false
  });

  log.snapshot('before');

  cy.request({
    method: 'POST',
    url: `https://${Cypress.env('okta_domain')}/api/v1/authn`,
    body: {
      username,
      password
    }
  }).then(({ body }) => {
    const config = {
      issuer: `https://${Cypress.env('okta_domain')}/oauth2/default`,
      clientId: Cypress.env('okta_client_id'),
      redirectUri: 'http://localhost:4200/signin/callback',
      scopes: ['openid', 'email', 'profile', 'groups'],
    };

    const authClient = new OktaAuth(config);

    return authClient.token
      .getWithoutPrompt({ sessionToken: body.sessionToken })
      .then(({ tokens }) => {
        authClient.tokenManager.setTokens(tokens);

        log.snapshot('after');
        log.end();
      })
      .catch((err) => {
        log.error(err);
        log.end();
      });
  });
});

Cypress.Commands.add('logout', () => {
  const log = Cypress.log({
    name: 'logout',
    displayName: 'LOGOUT BY OKTA',
    message: [`🔒 Logging out current user`],
    autoEnd: false,
  });

  const config = {
    issuer: `https://${Cypress.env('okta_domain')}/oauth2/default`,
    clientId: Cypress.env('okta_client_id'),
    redirectUri: 'http://localhost:4200/signin/callback',
    scopes: ['openid', 'email', 'profile', 'groups'],
  };

  const authClient = new OktaAuth(config);

  log.snapshot('before');

  authClient.signOut({
    revokeAccessToken: true,
    revokeRefreshToken: true
  }).then();

  return cy.location('pathname').should('equal', '/signin')
    .then(() => {
      log.snapshot('after');
      log.end();
    });
});

Cypress.Commands.add('switchUser', (username, password) => {
  cy.logout();
  cy.loginByOktaApi(username, password);
});
