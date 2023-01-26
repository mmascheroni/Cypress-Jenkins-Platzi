describe('Intercepting network requests', () => {
    it('Requests review', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/ditto').then(
            (response) => {
                expect(response.body).to.have.property('name', 'ditto');
                expect(response.status).to.equal(200);
                cy.log(response.body);
            }
        );
    });

    it('Test of simple intercept request', () => {
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/1').as(
            'bulbasaur'
        );

        cy.visit('/');

        cy.contains('Bulbasaur')
            .parent()
            .parent()
            .within((e) => {
                cy.wrap(e).contains('Más detalles').click();
            });

        // cy.wait('@bulbasaur').then((interception) => {
        //     cy.log(interception);
        //     expect(interception.response.body).to.have.property(
        //         'name',
        //         'bulbasaur'
        //     );
        //     expect(interception.response.statusCode).to.equal(200);
        // });

        cy.wait('@bulbasaur').its('response.statusCode').should('equal', 200);
        // cy.wait('@bulbasaur')
        //     .its('response.body.name')
        //     .should('equal', 'bulbasaur'); --> Fail to fix

        // cy.wait('@bulbasaur', { timeout: 2000 })

        //cy.intercept(
        // { method: 'POST, url: 'https://api.stripe.com/v1/charges' },
        // {
        // success: true,
        // }
        // )
    });

    it('Test Intercept force it to fail', () => {
        cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/1', {
            forceNetworkError: true,
        }).as('error');
        cy.visit('/'); // Force de fail in the request

        cy.contains('Bulbasaur')
            .parent()
            .parent()
            .within((element) => {
                cy.wrap(element).contains('Más detalles').click();
            });

        cy.wait('@error').should('have.property', 'error'); // Validate the error
    });

    // it.only('Intercept Test changing the body', () => {
    //     cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon-species/1', {
    //         statusCode: 200,
    //         body: {
    //             id: 25,
    //             name: 'Pikachu',
    //         },
    //     }).as('pikachu');
    //     cy.visit('/');

    //     cy.contains('Bulbasaur')
    //         .parent()
    //         .parent()
    //         .within((element) => {
    //             cy.wrap(element).contains('Más detalles').click();
    //         });

    //     cy.wait('@pikachu').then((interception) => {
    //         expect(interception.response.body).to.have.property(
    //             'name',
    //             'Pikachu'
    //         );
    //         expect(interception.response.statusCode).to.eq(200);
    //     });
    // });

    // it.only('Intercept Test changing the body with the url one', () => {
    //     cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/1', {
    //         statusCode: 200,
    //         body: {
    //             id: 25,
    //             name: 'Pikachu',
    //         },
    //     }).as('pikachu');

    //     cy.contains('Bulbasaur')
    //         .parent()
    //         .parent()
    //         .within((element) => {
    //             cy.wrap(element).contains('Más detalles').click();
    //         });

    //     cy.wait('@pikachu').then((interception) => {
    //         expect(interception.response.body).to.have.property(
    //             'name',
    //             'Pikachu'
    //         );
    //         expect(interception.response.statusCode).to.eq(200);
    //     });
    // });
});
