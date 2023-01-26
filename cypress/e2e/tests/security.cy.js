describe('Security in Cypress', () => {
    it('Navigate between different domains', () => {
        cy.visit('/');
        cy.visit('https://www.google.com');
    });

    it('Navigate a domain', function () {
        cy.visit('https://todo-cypress-iota.vercel.app');
        cy.get('h1').invoke('text').as('titulo');
    });

    it('Navigate a same domain', function () {
        cy.visit('https://todo-cypress-iota.vercel.app');
        cy.log(this.titulo);
    });

    it('Navigate a other domain', function () {
        cy.visit('/');
        cy.log(this.titulo);
        // --> When navigate an other domain, the save information with alias isn't share with other tests what visit other domains
    });

    it('Navigate in two different domains in the same test', function () {
        cy.visit('/');
        cy.get('h1')
            .first()
            .invoke('text')
            .then((text) => {
                Cypress.env({
                    texto: text,
                });
            });

        // cy.origin(
        //     'https://todo-cypress-iota.vercel.app',
        //     { args: { texto: 'hola' } },
        //     function ({ texto }) {
        //         cy.visit('/');
        //         cy.log(texto);
        //         cy.log(Cypress.env().texto);
        //     }
        // );

        cy.origin(
            'https://todo-cypress-iota.vercel.app',

            function () {
                cy.visit('/');
                cy.log(Cypress.env().texto);
            }
        );

        cy.visit('/'); // --> Then of visit the other domain with cy.contain() we should to back to the original domain
        cy.get('h1')
            .first()
            .invoke('text')
            .should('be.equal', Cypress.env('texto'));
    });

    it.only('Share information without using session', function () {
        cy.visit('/');
        cy.get('h1')
            .first()
            .invoke('text')
            .then((text) => {
                cy.task('save', { text: text });
            });
    });

    it.only('Share information without using session 2', function () {
        cy.visit('https://todo-cypress-iota.vercel.app');
        cy.task('get', 'text').then((value) => {
            cy.get('#title').type(value);
        });
    });
});
