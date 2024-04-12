import { expect, test } from '@playwright/experimental-ct-react';
import { HooksConfig } from '$/playwright';
import { Theme } from '@/app';
import { delay, TestContainer } from '$/helpers/forTests';
import { ToggleThemeButton } from '../ui/ToggleThemeButton';


test('ToggleThemeButton render and func', async ({ page, mount }) => {
    await mount<HooksConfig>(
        <TestContainer>
            <ToggleThemeButton/>
        </TestContainer>, {
            hooksConfig: {
                theme: Theme.DARK,
                i18n : true,
            },
        },
    );

    const button = await page.getByRole('button');
    await expect(page).toHaveScreenshot('ToggleThemeButton_before-toggle.png');
    await button.click({ force: true });
    await delay(300);
    await expect(page).toHaveScreenshot('ToggleThemeButton_after-toggle.png');
});