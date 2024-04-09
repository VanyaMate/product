import '@/shared/styles/index.scss';
import { afterMount, beforeMount } from '@playwright/experimental-ct-react/hooks';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config.ts';
import React from 'react';
import ThemeProvider
    from '../src/components/shared/ui/theme/ThemeContext/providers/ThemeProvider';
import ErrorBoundary
    from '../src/components/shared/ui/errors/ErrorBoundary/ErrorBoundary';
import { Theme } from '@/components/shared/ui/theme/ThemeContext/types/themes.ts';


export type HooksConfig = {
    routing?: boolean;
    i18n?: boolean;
    theme?: Theme;
    strict?: boolean;
    errorBoundary?: boolean;
}

beforeMount<HooksConfig>(async ({ hooksConfig, App }) => {
    console.log('Before Mount', <App/>);

    let appComponent = <App/>;

    if (hooksConfig?.strict) {
        appComponent = <React.StrictMode>{ appComponent }</React.StrictMode>;
    }
    if (hooksConfig?.errorBoundary) {
        appComponent = <ErrorBoundary>{ appComponent }</ErrorBoundary>;
    }
    if (hooksConfig?.routing) {
        appComponent = <BrowserRouter>{ appComponent }</BrowserRouter>;
    }
    if (hooksConfig?.i18n) {
        appComponent = <I18nextProvider i18n={ i18n }>{ appComponent }</I18nextProvider>;
    }
    if (hooksConfig?.theme) {
        appComponent =
            <ThemeProvider
                defaultTheme={ hooksConfig.theme }
                storageId="test-id"
                withStorage={ true }
            >{ appComponent }</ThemeProvider>;
    }

    return appComponent;
});

afterMount(async () => {
    console.log('After moount');
});