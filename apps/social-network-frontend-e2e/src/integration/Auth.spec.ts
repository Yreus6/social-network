import { getForbidden, getGreeting } from '../support/Auth.po';

describe('Authentication and Authorization', () => {
  describe('Unauthenticated user', () => {
    it('should redirect unauthenticated user to signin page', () => {
      cy.visit('/protected');
      cy.location('pathname').should('equal', '/signin');
      cy.percySnapshot('Redirect to Sign In');
    });
  });

  describe('Authenticated normal user', () => {
    beforeEach(() => {
      cy.loginByOktaApi(Cypress.env('auth_username'), Cypress.env('auth_password'));
    });

    it('should redirect authenticated user to home page', () => {
      cy.visit('/signin');
      cy.location('pathname').should('equal', '/');
      cy.get('h1').should('be.visible')
        .and('contain.text', 'Welcome');
      cy.percySnapshot('Redirect to Home');
    });

    it('should redirect user to landing page after logout', () => {
      cy.visit('/');
      cy.getBySel('logout-btn').click();
      cy.wait(2000);
      cy.getBySel('socivio-landing').should('be.visible')
        .and('contain.html', '<h3>Socivio</h3>');
      cy.percySnapshot('Redirect to Landing');
    });

    it('should display error message for user has not enough authorities', () => {
      cy.visit('/protected');
      getForbidden().should('be.visible')
        .and('have.text', 'You are not allowed to view this page');
      cy.percySnapshot('Forbidden');
    });
  });

  describe('Authenticated admin user', () => {
    beforeEach(() => {
      cy.loginByOktaApi(Cypress.env('admin_username'), Cypress.env('admin_password'));
    });

    it('should display greeting message for admin user', () => {
      cy.visit('/protected');
      getGreeting().should('be.visible')
        .and('contain.text', 'Hello');
      cy.percySnapshot('Greeting message');
    });
  });
});
