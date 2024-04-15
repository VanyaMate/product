import { defineConfig, devices } from '@playwright/experimental-ct-react';


export default defineConfig({
    testDir      : './tests',
    snapshotDir  : './snapshots',
    testMatch    : '*.e2e-pw.{ts,tsx}',
    timeout      : 10 * 1000,
    fullyParallel: true,
    forbidOnly   : !!process.env.CI,
    retries      : process.env.CI ? 2 : 0,
    workers      : process.env.CI ? 1 : undefined,
    reporter     : 'html',
    webServer    : {
        command            : 'npm run build:start',
        url                : 'http://localhost:4173/',
        timeout            : 20 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use          : {
        baseURL: 'http://localhost:4173/',
    },
    projects     : [
        {
            name: 'chromium',
            use : { ...devices['Desktop Chrome'] },
        },
        {
            name: 'iPhone 6',
            use : { ...devices['iPhone 6'] },
        },
    ],
});
