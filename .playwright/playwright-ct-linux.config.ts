import { defineConfig, devices } from '@playwright/experimental-ct-react';
import { InlineConfig } from 'vite';
import viteConfig from '../.vite/vite.config';


export default defineConfig({
    testDir      : '../src',
    snapshotDir  : './__snapshots__',
    testMatch    : '*.e2e-test.{ts,tsx}',
    timeout      : 10 * 1000,
    fullyParallel: true,
    forbidOnly   : !!process.env.CI,
    retries      : process.env.CI ? 2 : 0,
    workers      : process.env.CI ? 1 : undefined,
    reporter     : 'html',
    use          : {
        trace       : 'on-first-retry',
        ctPort      : 3100,
        ctViteConfig: viteConfig as InlineConfig,
    },
    projects     : [
        {
            name: 'chromium',
            use : { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use : { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use : { ...devices['Desktop Safari'] },
        },
        {
            name: 'iPhone 6',
            use : { ...devices['iPhone 6'] },
        },
        {
            name: 'Galaxy S9+',
            use : { ...devices['Galaxy S9+'] },
        },
        {
            name: 'iPad Mini',
            use : { ...devices['iPad Mini'] },
        },
    ],
});
