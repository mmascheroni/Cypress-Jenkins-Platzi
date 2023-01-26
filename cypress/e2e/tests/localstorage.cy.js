// const { it } = require('mocha');

// const { beforeEach } = require('mocha');

describe('Localstorage', () => {
    beforeEach(() => {
        // Set the elements in each test case in the UI
        // cy.visit('https://todo-cypress-iota.vercel.app');
        // cy.get('#title').type('Title of test');
        // cy.get('#description').type('Description of test');
        // cy.contains('Create').click();

        //Other way Set elements directly in the localstorage and use the function cy.session() for save the localstorage in all test cases

        cy.session('session todo', () => {
            cy.visit('https://todo-cypress-iota.vercel.app').then(() => {
                localStorage.setItem(
                    'react_todo_ids',
                    JSON.stringify(['Title of test'])
                );
                localStorage.setItem(
                    'Title of test',
                    JSON.stringify({
                        title: 'Title of test',
                        id: 'Title of test',
                        complete: false,
                        description: 'Description of test',
                    })
                );
            });
        });
    });

    it('Create a task', () => {
        cy.visit('https://todo-cypress-iota.vercel.app');
        //Validation
        cy.contains('Title of test');

        cy.reload();

        cy.contains('Title of test').then(() => {
            expect(localStorage.getItem('Title of test')).to.exist;
        });

        // Delete the element of test
        cy.contains('Remove')
            .click()
            .then(() => {
                expect(localStorage.getItem('Title of test')).to.not.exist;
            });

        // Clear the Local Storage is innecessary because cypress clear all it is equal to the cookies
        // cy.clearLocalStorage('Title of test').should((ls) => {
        //     expect(ls.getItem('prop1')).to.be.null;
        // });
    });

    // With this test case verify that the local storage is clearly automatically for cypress, We can use equal the cookies the function cy.session()
    it('Validate exist the task', () => {
        // cy.visit('https://todo-cypress-iota.vercel.app');
        expect(localStorage.getItem('Title of test')).to.exist;
    });
});
