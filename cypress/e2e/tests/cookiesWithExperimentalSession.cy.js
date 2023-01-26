// For save the cookies

describe('Working with the Cookies', () => {
    before(() => {
        // cy.clearCookies();
    });

    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/');
            cy.setCookie('nombre', 'Mauro'); // Adding the cookie
        });
    });

    // after(() => {
    //     cy.clearCookie('nombre');
    // });

    it('Get a specific cookie', () => {
        cy.getCookie('nombre').should('have.a.property', 'value', 'Mauro'); // This test fail because cypress clean the cookies before each test
    });
});
