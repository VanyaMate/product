import { expect, test } from '@playwright/experimental-ct-react';
import TestComponentProvider
    from '@/components/entities/TestComponent/TestComponentProvider.tsx';
import UpdateTestComponentButton
    from '@/components/entities/TestComponent/UpdateTestComponentButton.tsx';
import { delay } from '@/components/shared/tests/helpers/delay.ts';
import { Theme } from '@/components/shared/ui/theme/ThemeContext/types/themes.ts';


test('Test', async ({ mount, page }) => {
    await mount(
        <TestComponentProvider key="provider">
            {/* eslint-disable-next-line react/jsx-max-depth */ }
            <UpdateTestComponentButton/>
        </TestComponentProvider>, {
            hooksConfig: {
                theme: Theme.LIGHT,
            },
        },
    );

    const button = await page.getByRole('button');
    await button.click();
    await button.click();
    await button.click();
    await button.click();
    await button.click();

    /*    const button                    = await page.locator('button');
     const buttonText: string | null = await button.textContent();
     await expect(buttonText).toBe('0');
     await expect(page).toHaveScreenshot('UpdateTextComponent-before.png');
     await button.click({ force: true });
     await delay(100);
     await expect(page).toHaveScreenshot('UpdateTextComponent-after.png');

     const buttonLocal = await page.getByTestId('local-button');
     await buttonLocal.click();*/
});