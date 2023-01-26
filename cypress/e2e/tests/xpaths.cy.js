// First installing the pluging, then import the plugin into the support binder in the archive called e2e.js

describe('Working with xpaths', () => {
    it('Get with a css selector', () => {
        cy.visit('/');
        cy.get(
            '#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1'
        ).should('contain', 'Bulbasaur');
    });

    it('Get with a xpath', () => {
        cy.visit('/');
        cy.xpath('//h1[contains(text(), "Bulbasaur")]').should(
            'contain',
            'Bulbasaur'
        );
    });
});
