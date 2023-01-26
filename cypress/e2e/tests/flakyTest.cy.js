// It is inestable test. Flaky test sometimes passes and sometimes fails

describe('Flaky Tests', () => {
    it('Single query command', () => {
        cy.visit('/');
        // cy.get(
        //     '#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1'
        // ).contains('Balbaausar');

        // With this command or way the test will be executed or trying many times more than the last test
        cy.contains(
            '#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1',
            'Balbaausar'
        );
    });

    it('Toggle command with assertions', () => {
        cy.visit('/');

        // cy.get('#submit').click();

        // This will retry the cy.get() until the assertion passes
        // cy.get('#submit').should('not.to.be.disabled').click();

        cy.get(
            '#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1'
        )
            .should('contain', 'Bulbasaur')
            .parent()
            .should('have.class', 'card-header');
    });
});
