import { expect, test } from '@playwright/experimental-ct-react';
import { HooksConfig } from '$/playwright';
import { delay, TestContainer } from '@/shared/tests';
import { Button, ButtonStyleType } from '@/shared/ui-kit';
import { Theme } from '@/app';


test('Render buttons with DARK mode', async ({ mount, page }) => {
    await mount<HooksConfig>(
        <TestContainer>
            <Button styleType={ ButtonStyleType.PRIMARY }>Primary</Button>
            <Button styleType={ ButtonStyleType.SECOND }>Second</Button>
            <Button styleType={ ButtonStyleType.GHOST }>Ghost</Button>
        </TestContainer>, {
            hooksConfig: {
                theme        : Theme.DARK,
            },
        },
    );

    const primaryButton = await page.getByText('Primary');
    await page.getByText('Second');
    await page.getByText('Ghost');

    await delay(100);
    await expect(page).toHaveScreenshot('Buttons_dark-mode_idle.png');

    await primaryButton.hover();
    await expect(page).toHaveScreenshot('Buttons_dark-mode_hover.png');
});