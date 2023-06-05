describe('Authentication and Authorization', () => {
  describe('Unauthenticated user', () => {
    it('should redirect unauthenticated user to signin page', () => {
      cy.visit('/profile');
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
      cy.percySnapshot('Redirect to Home');
    });

    it('should redirect user to landing page after logout', () => {
      cy.visit('/');
      cy.getBySel('dropdown-btn', { timeout: 20000 }).click();
      cy.getBySel('logout-btn', { timeout: 20000 }).click();
      cy.get('#okta-sign-in').should('be.visible');
      cy.getBySel('socivio-landing').should('be.visible')
        .and('contain.html', '<h3>Socivio</h3>');
      cy.percySnapshot('Redirect to Landing');
    });
  });
});
