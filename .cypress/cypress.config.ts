import { defineConfig } from 'cypress';
//@ts-ignore
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin';


export default defineConfig({
    video                 : true,
    videoCompression      : true,
    screenshotOnRunFailure: false,
    videosFolder          : './.cypress/videos',
    supportFolder         : './.cypress/support',
    e2e                   : {
        baseUrl          : 'http://localhost:4173/',
        testIsolation    : true,
        specPattern      : './.cypress/tests/**/*.e2e-cy.ts',
        supportFile      : './.cypress/support/e2e.ts',
        screenshotsFolder: './.cypress/screenshots',
        viewportWidth    : 1920,
        viewportHeight   : 1500,
        env              : {
            'preserveOriginalScreenshot': true,
        },
        setupNodeEvents (on, config) {
            return getCompareSnapshotsPlugin(on, config);
        },
    },
});