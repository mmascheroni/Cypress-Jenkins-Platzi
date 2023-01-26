describe('Visual Testing', () => {
    it('First regression test', () => {
        cy.visit('/');

        cy.matchImageSnapshot();
    });
});
