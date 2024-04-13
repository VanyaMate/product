import '@/shared/styles/index.scss';
import { afterMount, beforeMount } from '@playwright/experimental-ct-react/hooks';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config.ts';
import React from 'react';
import { Theme, ThemeProvider } from '@/app';
import { ErrorBoundary } from '@/shared/ui-kit';


export type HooksConfig = {
    routing?: boolean;
    i18n?: boolean;
    theme?: Theme;
    strict?: boolean;
    errorBoundary?: boolean;
}

beforeMount<HooksConfig>(async ({ hooksConfig, App }) => {
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
});