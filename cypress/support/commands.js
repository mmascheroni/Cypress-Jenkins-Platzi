// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

// Plugin - Command Image Snapshot
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    failureThreshold: 0.3, // Tolerance to fail
    failureThresholdType: 'percent', // type of fail
    customDiffConfig: { threshold: 0.1 }, // Treshold of each pixel
    capture: 'viewport',
});

// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', (email, password) => {
    const userInput = '#user_login';
    const passwordInput = '#user_password';
    const loginBtn = '#login_form > div.form-actions > input';

    cy.visit('http://zero.webappsecurity.com/login.html');

    cy.get(userInput).should('be.visible');
    cy.get(passwordInput).should('be.visible');
    cy.get(loginBtn).should('be.visible');

    cy.get(userInput).type(email);
    cy.get(passwordInput).type(password, { sensitve: true });
    cy.get(loginBtn).click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// This overwrite 'type' is serves to hide sensitive information for example passwords
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitve) {
        options.log = false;

        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        });
    }

    return originalFn(element, text, options);
});
