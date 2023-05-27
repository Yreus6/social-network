import { getGreeting } from '../support/App.po';

describe('social-network-frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/App.po.ts` file
    getGreeting().contains('Welcome to social-network-frontend!');
  });
});
