const devices = [
    {
        viewport: 'macbook-15',
        type: 'desktop',
    },
    {
        viewport: 'samsung-s10',
        type: 'mobile',
    },
    {
        viewport: [1200, 720],
        type: 'desktop',
    },
    {
        viewport: [375, 667],
        type: 'mobile',
    },
];

describe('Mobile devices', () => {
    // it('Using the pc viewport', () => {
    //     cy.viewport(1200, 720);
    //     cy.visit('/');
    //     cy.contains('Safari').should('exist');
    // });
    // it('using a mobile viewport', () => {
    //     cy.viewport(375, 667);
    //     cy.visit('/');
    //     cy.contains('Safari').should('not.be.visible');
    // });
    // it('using a desktop preset viewport', () => {
    //     cy.viewport('macbook-15');
    //     cy.visit('/');
    //     cy.contains('Safari').should('exist');
    // });
    // it('using a mobile preset viewport', () => {
    //     cy.viewport('samsung-s10');
    //     cy.visit('/');
    //     cy.contains('Safari').should('exist');
    // });

    devices.forEach((device) => {
        it(`Test on viewport: ${device.viewport} and type: ${device.type}`, () => {
            if (Cypress._.isArray(device.viewport)) {
                cy.viewport(device.viewport[0], device.viewport[1]);
            } else {
                cy.viewport(device.viewport);
            }

            cy.visit('/');

            if (device.type === 'desktop') {
                cy.contains('Safari').should('exist');
            } else {
                cy.contains('Safari').should('not.be.visible');
            }
        });
    });
});
