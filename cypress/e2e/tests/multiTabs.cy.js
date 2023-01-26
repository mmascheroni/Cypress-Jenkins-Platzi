describe('Navigate between different tabs', () => {
    it('Visit links that have the target _blank', () => {
        cy.visit('https://demoqa.com/links');
        cy.get('#simpleLink').click();
        // This open the tab out of the Cypress console
    });

    it.only('Visit links that have the target _blank in the same window', () => {
        cy.visit('https://demoqa.com/links');
        cy.get('#simpleLink').invoke('removeAttr', 'target').click();
    });
});
