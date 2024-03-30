import type { StorybookConfig } from '@storybook/react-vite';


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
    framework: {
        name   : '@storybook/react-vite',
        options: {},
    },
    docs     : {
        autodocs: 'tag',
    },
};
export default config;
