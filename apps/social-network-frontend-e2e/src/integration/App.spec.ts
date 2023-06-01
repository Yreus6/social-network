import { getForbidden, getGreeting } from '../support/App.po';

describe('social-network-frontend', () => {
  beforeEach(() => {
    cy.loginByOktaApi(Cypress.env('auth_username'), Cypress.env('auth_password'));
  });

  it(`should display title "Welcome test user" in home page`, () => {
    cy.visit('/');
    cy.fixture('okta-user.json').then((oktaUser) => {
      getGreeting().should('have.text', `Welcome ${oktaUser.name}`);
    });
  });

  it('should display error message when user has not enough authorities', () => {
    cy.visit('/protected');
    getForbidden().should('be.visible')
      .and('have.text', 'You are not allowed to view this page');
  });
});
