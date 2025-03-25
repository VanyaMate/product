import { test, expect } from 'playwright/test';
import { classesContains } from '../../lib/classesContains';


test('toggle theme on page', async ({ page }) => {
    await page.goto('/');
    const toggleButton = await page.waitForSelector(`button[aria-label='Переключить тему'], button[aria-label='Toggle theme']`);
    expect(classesContains(await page.$eval('body', (el) => el.className), 'theme', 'dark')).toBe(true);
    await toggleButton.click();
    expect(classesContains(await page.$eval('body', (el) => el.className), 'theme', 'light')).toBe(true);
});