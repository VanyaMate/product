import { test } from 'playwright/test';


test('toggle language on page', async ({ page }) => {
    await page.goto('/');
    const toggleButton                       = await page.waitForSelector(`button[aria-label='Переключить язык на английский'], button[aria-label='Toggle language on russian']`);
    const toggleButtonAriaLabel: string      = await toggleButton.getAttribute('aria-label');
    const isToggleToEnglishLanguage: boolean = toggleButtonAriaLabel === 'Переключить язык на английский';
    await toggleButton.click();
    await page.waitForSelector(`button[aria-label='${ isToggleToEnglishLanguage
                                                      ? 'Toggle language on russian'
                                                      : 'Переключить язык на английский' }']`);
});