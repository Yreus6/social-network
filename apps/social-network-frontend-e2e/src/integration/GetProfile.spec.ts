import { aliasQuery } from '../support/graphlqlTestUtils';

const apiGraphQL = `${Cypress.env('api_url')}/graphql`;

describe('Get user profile', () => {
  context('Get my profile', () => {
    beforeEach(() => {
      cy.task('db:seed');

      cy.intercept('POST', apiGraphQL, (req) => {
        aliasQuery(req, 'GetProfileForUser');
      });

      cy.loginByOktaApi(Cypress.env('auth_username'), Cypress.env('auth_password'));
    });

    it('should show my profile', () => {
      cy.visit('/profile');
      cy.wait('@gqlGetProfileForUserQuery');
      cy.getBySel('display-name').should('be.visible')
        .and('contain.text', 'Socivio Test');
      cy.percySnapshot('My profile');
    });
  });

  context('Get other profile', () => {
    beforeEach(() => {
      cy.intercept('POST', apiGraphQL, (req) => {
        aliasQuery(req, 'GetProfileForUser');
      });

      cy.loginByOktaApi(Cypress.env('auth2_username'), Cypress.env('auth2_password'));
    });

    it('should show other profile', () => {
      cy.visit('/profile?userId=00u3ibbqx4rvzMZSK5d7');
      cy.wait('@gqlGetProfileForUserQuery');
      cy.getBySel('display-name').should('be.visible')
        .and('contain.text', 'Socivio Test');
      cy.getBySel('add-friend-btn').should('be.visible')
        .and('contain.text', 'Add Friend');
      cy.percySnapshot('Other profile');
    });

    it('should show profile not found', () => {
      cy.visit('/profile?userId=1234');
      cy.wait('@gqlGetProfileForUserQuery');
      cy.getBySel('profile-not-found').should('be.visible')
        .and('contain.text', 'Profile Not Found');
      cy.percySnapshot('Profile not found');
    });
  });
});
