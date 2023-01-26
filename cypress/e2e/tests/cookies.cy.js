// For save the cookies
Cypress.Cookies.defaults({
    preserve: 'nombre',
});

describe('Working with the Cookies', () => {
    before(() => {
        cy.clearCookies();
    });

    after(() => {
        cy.clearCookie('nombre');
    });

    it('Get Cookies', () => {
        cy.visit('/');
        cy.getCookies().should('be.empty'); // Getting the cookies and validate that are empties
    });

    it('Add a cookie', () => {
        cy.visit('/');
        cy.setCookie('nombre', 'Mauro'); // Adding the cookie
        cy.getCookies().should('have.length', 1);
    });

    it('Get a specific cookie', () => {
        cy.visit('/');
        cy.getCookie('nombre').should('have.a.property', 'Mauro'); // This test fail because cypress clean the cookies before each test
    });
});
