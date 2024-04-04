import { expect, test } from '@playwright/experimental-ct-react';
import { HooksConfig } from '$/playwright';
import TestContainer from '@/components/shared/tests/ui/TestContainer.tsx';
import ToggleThemeButton
    from '@/components/shared/ui/theme/ThemeContext/ui/ToggleThemeButton/ToggleThemeButton.tsx';
import { Theme } from '@/components/shared/ui/theme/ThemeContext/types/themes.ts';
import { delay } from '@/components/shared/tests/helpers/delay.ts';


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