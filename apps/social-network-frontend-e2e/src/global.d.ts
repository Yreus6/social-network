declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<Element>>;
    getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<Element>>;

    /**
     * Logs-in user by using Okta API request
     */
    loginByOktaApi(username: string, password?: string): Chainable<Response>;
    logout(): Chainable<Response>;
    switchUser(username: string, password?: string): Chainable<Response>;
  }
}
