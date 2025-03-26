import {
    getCallsMockData, getFriendsMockData,
    getUserFullMockData,
} from '../../../../.playwright/utils/mock/mockdata.fabric';


describe('Authorization', () => {
    it('should handle authorization flow', () => {
        const mockUserData = {
            login   : 'testuser',
            password: 'testpassword',
            remember: true,
        };

        cy.intercept('GET', '**/api/v1/authentication', {
            statusCode: 401,
        }).as('authCheck');

        cy.intercept('POST', '**/api/v1/authentication/login', (req) => {
            expect(req.body).to.deep.equal(mockUserData);
            req.reply({
                statusCode: 200,
                body      : {
                    data: {
                        tokens: [ 'token-1', 'token-2' ],
                        user  : getUserFullMockData('1', mockUserData.login),
                    },
                },
            });
        }).as('login');

        cy.intercept('GET', `**/api/v1/users/full/${ mockUserData.login }`, {
            statusCode: 200,
            body      : {
                data: getUserFullMockData('1', mockUserData.login),
            },
        }).as('getUserFull');

        cy.intercept('GET', '**/api/v1/calls', {
            statusCode: 200,
            body      : { data: getCallsMockData() },
        }).as('getCalls');

        cy.intercept('GET', '**/api/v1/friends', {
            statusCode: 200,
            body      : {
                data: getFriendsMockData(),
            },
        }).as('getFriends');

        cy.visit('/');

        cy.get('input[name="login"]').type(mockUserData.login);
        cy.get('input[name="password"]').type(mockUserData.password);

        if (mockUserData.remember) {
            cy.get('input[name="remember"] ~ label').click();
        }

        cy.get('button[type="submit"]').should('not.be.disabled').click();

        cy.wait(`@login`);
        cy.get('button[type="button"] > div > span')
            .contains(`${ mockUserData.login }`)
            .should('be.visible');
    });
});