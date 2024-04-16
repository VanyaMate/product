import type { StorybookConfig } from '@storybook/react-vite';
import * as path from 'path';


const config: StorybookConfig = {
    stories  : [ '../src/**/*.{stories,story}.@(js|jsx|mjs|ts|tsx)' ],
    addons   : [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-controls',
    ],
    core     : {
        builder: {
            name   : '@storybook/builder-vite',
            options: {
                viteConfigPath: './.vite/vite.config.ts',
            },
        },
    },
    framework: {
        name   : '@storybook/react-vite',
        options: {},
    },
    docs     : {
        autodocs: 'tag',
    },
    async viteFinal (config) {
        const { mergeConfig } = await import('vite');
        return mergeConfig(config, {
            resolve: {
                alias: [
                    {
                        find       : '@',
                        replacement: path.resolve(__dirname, '..', 'src'),
                    },
                    {
                        find       : '$',
                        replacement: path.resolve(__dirname, '..'),
                    },
                ],
            },
        });
    },
};
export default config;
