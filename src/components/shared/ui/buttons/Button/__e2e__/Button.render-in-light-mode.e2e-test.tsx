import { expect, test } from '@playwright/experimental-ct-react';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import { delay } from '@/components/shared/tests/helpers/delay.ts';
import { ButtonStyleType } from '@/components/shared/ui/buttons/Button/types/types.ts';
import { HooksConfig } from '$/playwright';
import { Theme } from '@/components/shared/ui/theme/ThemeContext/types/themes.ts';
import TestContainer from '@/components/shared/tests/ui/TestContainer.tsx';


test('Render buttons with LIGHT mode', async ({ mount, page }) => {
    await mount<HooksConfig>(
        <TestContainer>
            <Button styleType={ ButtonStyleType.PRIMARY }>Primary</Button>
            <Button styleType={ ButtonStyleType.SECOND }>Second</Button>
            <Button styleType={ ButtonStyleType.GHOST }>Ghost</Button>
        </TestContainer>, {
            hooksConfig: {
                theme: Theme.LIGHT,
            },
        },
    );

    const primaryButton = await page.getByText('Primary');
    await page.getByText('Second');
    await page.getByText('Ghost');

    await delay(100);
    await expect(page).toHaveScreenshot('Buttons_light-mode_idle.png');

    await primaryButton.hover();
    await expect(page).toHaveScreenshot('Buttons_light-mode_hover.png');
});