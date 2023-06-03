declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    getBySel(dataTestAttribute: string, args?: any): Chainable<Element>;

    getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<Element>;

    /**
     * Logs-in user by using Okta API request
     */
    loginByOktaApi(username: string, password?: string): Chainable<Response>;
  }
}
