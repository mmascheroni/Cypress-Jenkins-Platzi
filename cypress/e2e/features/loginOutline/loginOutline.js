const {
    Given,
    When,
    Then,
} = require('@badeball/cypress-cucumber-preprocessor');
const { loginPage } = require('../../../pageObjects/LoginPage');

Given('I am on the login page', () => {
    loginPage.visit();
    loginPage.validateLoginPage();
});

When(/^I fill in my email and password with (.*) and (.*)$/, (user, email) => {
    loginPage.login(user, email);
});

Then('I should validate that I am not logged in', () => {
    loginPage.validateErrorLogin();
});
