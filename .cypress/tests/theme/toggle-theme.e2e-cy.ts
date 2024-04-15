describe('Toggle theme', () => {
    it('HomePage', () => {
        cy.visit('/');
        cy.get('body').should('satisfy', ([ body ]: HTMLElement[]) => {
            return [ 'theme', 'dark' ].every((className) => body.classList.contains(className));
        });
        cy.compareSnapshot('dark');
        const toggleThemeButton = cy.get('button[aria-label="Переключить тему"]');
        toggleThemeButton.click();
        cy.compareSnapshot('light');
        cy.get('body').should('satisfy', ([ body ]: HTMLElement[]) => {
            return [ 'theme', 'light' ].every((className) => body.classList.contains(className));
        });
    });
});