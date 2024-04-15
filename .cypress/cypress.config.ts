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
        viewportWidth    : 1920,
        viewportHeight   : 1080,
        specPattern      : './.cypress/tests/**/*.e2e-cy.ts',
        supportFile      : './.cypress/support/e2e.ts',
        screenshotsFolder: './.cypress/screenshots',
        env              : {
            "preserveOriginalScreenshot": true
        },
        setupNodeEvents (on, config) {
            return getCompareSnapshotsPlugin(on, config);
        },
    },
});