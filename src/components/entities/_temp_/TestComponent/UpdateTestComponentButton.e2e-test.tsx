import { test } from '@playwright/experimental-ct-react';
import { Theme } from '@/components/shared/ui/theme/ThemeContext/types/themes.ts';
import TestComponentProvider
    from '@/components/entities/_temp_/TestComponent/TestComponentProvider.tsx';
import UpdateTestComponentButton
    from '@/components/entities/_temp_/TestComponent/UpdateTestComponentButton.tsx';


test('Test', async ({ mount, page }) => {
    await mount(
        <TestComponentProvider key="provider">
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