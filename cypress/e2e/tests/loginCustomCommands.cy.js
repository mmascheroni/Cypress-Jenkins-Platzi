describe('Login with Custom Commands is a Cypress "Pattern"', () => {
    it('Success Login', () => {
        cy.login('username', 'password');
    });

    it('Success Login cy.env --> enviroment variables', () => {
        cy.login(
            Cypress.env('credentials').user,
            Cypress.env('credentials').password
        );
    });

    it('Success Login .env.json --> environment variables from a Json', () => {
        cy.login(
            Cypress.env('credentials').user,
            Cypress.env('credentials').password
        );
    });
});
