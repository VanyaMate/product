import { test, expect } from 'playwright/test';
import {
    getCallsMockRoute,
    getFriendsMockRoute, getUserFullMockRoute,
    loginMockRoute,
} from '../../../utils/mock/mockroutes';


test('authorization', async ({ page }) => {
    const mockUserData = {
        login   : 'testuser',
        password: 'testpassword',
        remember: false,
    };

    await page.route('**/api/v1/authentication', async (route) => {
        await route.fulfill({
            status: 401,
        });
    });
    await page.route('**/api/v1/authentication/login', loginMockRoute(mockUserData));
    await page.route(`**/api/v1/users/full/${ mockUserData.login }`, getUserFullMockRoute(mockUserData.login));
    await page.route('**/api/v1/calls', getCallsMockRoute());
    await page.route('**/api/v1/friends', getFriendsMockRoute());

    await page.goto('/');

    await page.fill('input[name="login"]', mockUserData.login);
    await page.fill('input[name="password"]', mockUserData.password);
    mockUserData.remember && await page.click(`input[name="remember"] ~ label`);

    const button = await page.waitForSelector('button[type="submit"]:not([disabled])');
    await button.click();

    await expect(page.getByRole('button', { name: `${ mockUserData.login[0] } ${ mockUserData.login }` })).toBeVisible();
});