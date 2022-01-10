import { aliasMutation, aliasQuery } from '../support/graphlqlTestUtils';

const apiGraphQL = `${Cypress.env('api_url')}/graphql`;

describe('Add friend', () => {
  beforeEach(() => {
    cy.task('db:seed');

    cy.intercept('POST', apiGraphQL, (req) => {
      aliasQuery(req, 'GetProfileForUser');
      aliasQuery(req, 'GetSentRequestsForUser');
      aliasQuery(req, 'GetFriendRequestsForUser');

      aliasMutation(req, 'SendFriendRequestForUser');
      aliasMutation(req, 'ConfirmFriendRequestForUser');
      aliasMutation(req, 'RemoveFriendForUser');
    });

    cy.loginByOktaApi(Cypress.env('auth_username'), Cypress.env('auth_password'));
  });

  it('should user success send friend request', () => {
    cy.visit('/profile?userId=00u3icp6uaMxa2Eby5d7');
    cy.wait('@gqlGetProfileForUserQuery');
    cy.getBySel('add-friend-btn').click();
    cy.getBySel('add-friend-btn').should('contain.text', 'Sending Request');
    cy.percySnapshot('Send friend request');
    cy.wait('@gqlSendFriendRequestForUserMutation');
    cy.getBySel('cancel-request-btn').should('contain.text', 'Cancel Request');

    cy.visit('/friends/sents');
    cy.wait('@gqlGetSentRequestsForUserQuery');
    cy.getBySelLike('sent-request')
      .should('have.length', 1)
      .first()
      .should('contain', 'Socivio Test2')
      .and('contain', 'Cancel');
    cy.percySnapshot('Sent requests');

    /*// login as user2
    cy.switchUser(Cypress.env('auth2_username'), Cypress.env('auth2_password'));
    cy.percySnapshot('Switch to other user');

    cy.visit('/friends/requests');
    cy.wait('@gqlGetFriendRequestsForUserQuery');
    cy.getBySelLike('friend-request')
      .should('have.length', 1)
      .first()
      .should('contain', 'Socivio Test')
      .and('contain', 'Accept');
    cy.percySnapshot('Friend requests');
    cy.getBySel('accept-friend-btn').click();
    cy.wait('@gqlConfirmFriendRequestForUserMutation');
    cy.getBySel('accepted-friend-btn').should('be.visible')
      .and('contain.text', 'Accepted');
    cy.percySnapshot('Accept friend request');

    // unfriend
    cy.visit('/profile?userId=00u3ibbqx4rvzMZSK5d7');
    cy.wait('@gqlGetProfileForUserQuery');
    cy.getBySel('friends-toggle-btn').click();
    cy.getBySel('unfriend-btn').click();
    cy.wait('@gqlRemoveFriendForUserMutation');
    cy.getBySel('add-friend-btn').should('be.visible');*/
  });
});
