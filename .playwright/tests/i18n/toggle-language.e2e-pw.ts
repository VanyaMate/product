import { test, expect } from 'playwright/test';


test('toggle language on page', async ({ page }) => {
    await page.goto('/');
    const toggleButton                          = await page.waitForSelector(`button[aria-label='Переключить язык на английский'], button[aria-label='Toggle language on russian']`);
    const beforeClickValue: string              = await toggleButton.textContent();
    const beforeClickIsRussianLanguage: boolean = beforeClickValue === 'РУС';
    await expect(page).toHaveScreenshot('before_click.png');
    await toggleButton.click();
    await expect(page).toHaveScreenshot('after_click.png');
    await page.waitForSelector(`button[aria-label='${ beforeClickIsRussianLanguage
                                                      ? 'Toggle language on russian'
                                                      : 'Переключить язык на английский' }']`);
});