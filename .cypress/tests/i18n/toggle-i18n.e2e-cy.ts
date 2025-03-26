describe('Language Toggle', () => {
    it('should toggle language on page', () => {
        cy.visit('/');

        cy.get('button[aria-label="Переключить язык на английский"], button[aria-label="Toggle language on russian"]')
            .then($button => {
                const isToggleToEnglishLanguage = $button.attr('aria-label') === 'Переключить язык на английский';

                cy.wrap($button).click();

                cy.get(`button[aria-label="${
                    isToggleToEnglishLanguage
                    ? 'Toggle language on russian'
                    : 'Переключить язык на английский'
                }"]`).should('exist');
            });
    });
});