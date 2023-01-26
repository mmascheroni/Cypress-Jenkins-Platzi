describe('Test API with Token use Cookies', () => {
    // beforeEach(() => {

    // });

    it('Request GET', () => {
        cy.request({
            url: 'https://hotels4.p.rapidapi.com/v2/get-meta-data',
            method: 'GET',
            headers: {
                'X-RapidAPI-Key':
                    '605d14b08emsh7540c415393e178p1c86a6jsnaa28aed8918f',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            },
        }).then((response) => {
            console.log(response);
            expect(response.status).to.eq(200);

            // const id = response.body.id;
            // cy.wrap(id).as('id');
        });
    });
});
