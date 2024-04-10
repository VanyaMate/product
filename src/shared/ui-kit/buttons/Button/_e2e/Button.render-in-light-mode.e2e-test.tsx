import { expect, test } from '@playwright/experimental-ct-react';
import { HooksConfig } from '$/playwright';
import { ButtonStyleType } from '../types/types';
import { Button } from '../ui/Button';
import { delay, TestContainer } from '@/shared/tests';
import { Theme } from '@/app';


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