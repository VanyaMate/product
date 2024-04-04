import { test, expect } from '@playwright/experimental-ct-react';
import { HooksConfig } from '$/playwright';
import SiteApp from '@/apps/SiteApp/SiteApp.tsx';
import { delay } from '@/components/shared/tests/helpers/delay.ts';


test('Test functions', async ({ mount, page }) => {
    // Initial state
    await mount<HooksConfig>(<SiteApp/>);
    await delay(100);
    await expect(page).toHaveScreenshot('SiteApp_initial-state.png');

    // Test dark theme
    const darkThemeContainer = await page.locator('.theme.dark');
    await expect(darkThemeContainer).toBeVisible();
    const toggleTheme = await page.locator('[aria-label="Переключить тему"]');
    await toggleTheme.click({ force: true });
    await delay(100);

    // Test light theme
    const lightThemeContainer = await page.locator('.theme.light');
    await expect(lightThemeContainer).toBeVisible();
    await expect(page).toHaveScreenshot('SiteApp_toggle-theme.png');

    // Test language
    const toggleLanguage = await page.getByText('РУС');
    await toggleLanguage.click({ force: true });
    await delay(100);
    await expect(page).toHaveScreenshot('SiteApp_toggle-language.png');
});