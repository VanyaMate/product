import { defineConfig, devices } from '@playwright/experimental-ct-react';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
    testDir: './',
    snapshotDir: '__snapshots__',
    testMatch  : '*.e2e-test.tsx',
    timeout: 10 * 1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        ctPort      : 3100,
        ctViteConfig: {
            plugins: [
                react(),
            ],
            css    : {
                modules: {
                    generateScopedName: '[name]_[local]_[hash:base64:5]',
                },
            },
            resolve: {
                alias: {
                    '@': './src',
                    '$': './',
                },
            },
        },
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use : { ...devices['Desktop Chrome'] },
        },
        {
            name: 'webkit',
            use : { ...devices['Desktop Safari'] },
        },
    ],
});