import { loginPage } from '../PageObjects/LoginPage';

describe('Test Login with POM Pattern', () => {
    beforeEach(() => {
        loginPage.visit();
    });

    it('Failed login', () => {
        loginPage.validateLoginPage();
        loginPage.login('mauro@gmail.com', '12345678');
        loginPage.validateErrorLogin();
    });

    it('Success login', () => {
        loginPage.validateLoginPage();
        loginPage.login('username', 'password');
        loginPage.validateSuccessLogin();
    });

    it.only('Wrong login with fixtures', () => {
        loginPage.validateLoginPage();

        cy.fixture('credentials').then((credentials) => {
            loginPage.login(credentials.name, credentials.password);
        });

        loginPage.validateErrorLogin();
    });

    // it.only('Successful login with fixtures', () => {
    //     loginPage.validateLoginPage();

    //     cy.fixture('credentials').then((credentials) => {
    //         loginPage.login(credentials.name, credentials.password);
    //     });

    //     loginPage.validateSuccessfulLogin();
    // });
});
