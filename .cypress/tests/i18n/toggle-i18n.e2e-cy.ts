describe('Toggle i18n', () => {
    it('HomePage', () => {
        cy.visit('/');
        const toggleLangButton = cy.get('button[aria-label="Переключить язык на английский"]');
        cy.compareSnapshot('ru-lang');
        toggleLangButton.click();
        cy.get('button[aria-label="Toggle language on russian"]');
        cy.compareSnapshot('eng-land');
    });
});