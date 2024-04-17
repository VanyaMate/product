import { FC, memo, ComponentPropsWithoutRef, StrictMode } from 'react';
import {
    i18nConfig,
    ReduxGlobalStoreProvider,
    ThemeProvider,
} from '@/app';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/ui-kit';

export type AppProvidersProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const AppProviders: FC<AppProvidersProps> = memo(function AppProviders (props) {
    const { children } = props;

    return (
        <StrictMode>
            <ReduxGlobalStoreProvider>
                <I18nextProvider i18n={ i18nConfig }>
                    <BrowserRouter>
                        <ThemeProvider
                            isPageTheme={ true }
                            storageId="site-app"
                            withStorage={ true }
                        >
                            <ErrorBoundary>
                                { children }
                            </ErrorBoundary>
                        </ThemeProvider>
                    </BrowserRouter>
                </I18nextProvider>
            </ReduxGlobalStoreProvider>
        </StrictMode>
    );
});