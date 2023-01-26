// For save the cookies

describe('Working with the Cookies', () => {
    before(() => {
        cy.clearCookies();
    });

    after(() => {
        cy.clearCookie('nombre');
    });

    const session = () => {
        cy.session('nombre', () => {
            cy.setCookie('nombre', 'Mauro'); // Adding the cookie
            cy.getCookies().should('have.length', 1);
        });
    };

    it('Get Cookies', () => {
        cy.visit('/');
        cy.getCookies().should('be.empty'); // Getting the cookies and validate that are empties
    });

    it('Add a cookie', () => {
        session();
    });

    it('Get a specific cookie', () => {
        session();
        cy.getCookie('nombre').should('have.a.property', 'value', 'Mauro'); // This test fail because cypress clean the cookies before each test
    });
});
