import { getGreeting } from '../support/App.po';

describe('social-network-frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should display hello world title', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/App.po.ts` file
    getGreeting().contains('Hello World');
  });
});
