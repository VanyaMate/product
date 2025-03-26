import { classesContains } from '../../../.playwright/lib/classesContains';


describe('Theme Toggle', () => {
    it('should toggle theme on page', () => {
        cy.visit('/');

        cy.get('button[aria-label="Переключить тему"], button[aria-label="Toggle theme"]')
            .should('exist');

        cy.get('body')
            .should(($body) => {
                expect(classesContains($body.attr('class'), 'theme', 'dark')).to.be.true;
            });

        cy.get('button[aria-label="Переключить тему"], button[aria-label="Toggle theme"]')
            .click();

        cy.get('body')
            .should(($body) => {
                expect(classesContains($body.attr('class'), 'theme', 'light')).to.be.true;
            });
    });
});