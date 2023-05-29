import { getGreeting } from '../support/App.po';

describe('social-network-frontend', () => {
  beforeEach(() => {
    cy.loginByOktaApi(Cypress.env('auth_username'), Cypress.env('auth_password'));
    cy.visit('/protected');
  });

  it(`should display title "Hello ${Cypress.env('auth_username')}"`, () => {
    getGreeting().should('have.text', `Hello ${Cypress.env('auth_username')}!`);
  });
});
