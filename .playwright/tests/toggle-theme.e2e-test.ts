import { test } from 'playwright/test';
import { i18nConfig } from '../../src/app';


test('toggle theme on page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator(`button[aria-label="${ i18nConfig.t('toggle_theme_button') }]"`)).toBeInTheDocument();
});