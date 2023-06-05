import { aliasMutation, aliasQuery } from '../support/graphlqlTestUtils';

const apiGraphQL = `${Cypress.env('api_url')}/graphql`;

describe('Add friend', () => {
  beforeEach(() => {
    cy.task('db:seed');

    cy.intercept('POST', apiGraphQL, (req) => {
      aliasQuery(req, 'GetProfileForUser');
      aliasQuery(req, 'GetSentRequestsForUser');
      aliasQuery(req, 'GetFriendRequestsForUser');
      aliasQuery(req, 'GetFriendSuggestionsForUser');

      aliasMutation(req, 'SendFriendRequestForUser');
      aliasMutation(req, 'ConfirmFriendRequestForUser');
      aliasMutation(req, 'RemoveFriendForUser');
    });

    cy.loginByOktaApi(Cypress.env('auth_username'), Cypress.env('auth_password'));
  });

  it('should user success send friend request', () => {
    cy.visit('/profile?userId=00u3icp6uaMxa2Eby5d7');
    cy.wait('@gqlGetProfileForUserQuery', { timeout: 20000 });
    cy.getBySel('add-friend-btn').click();
    cy.getBySel('add-friend-btn').should('contain.text', 'Sending Request');
    cy.percySnapshot('Send friend request');
    cy.wait('@gqlSendFriendRequestForUserMutation', { timeout: 20000 });
    cy.getBySel('cancel-request-btn').should('contain.text', 'Cancel Request');

    cy.visit('/friends');
    cy.wait(['@gqlGetFriendRequestsForUserQuery', '@gqlGetSentRequestsForUserQuery', '@gqlGetFriendSuggestionsForUserQuery'], { timeout: 30000 });
    cy.getBySel('sents-link').click();
    cy.getBySelLike('sent-request')
      .should('have.length', 1)
      .first()
      .should('contain', 'Socivio Test2')
      .and('contain', 'Cancel');
    cy.percySnapshot('Sent requests');
  });
});
