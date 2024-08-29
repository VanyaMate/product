import { FC, memo, ComponentPropsWithoutRef, StrictMode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18nConfig } from '@/app/i18n/config/i18n.ts';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { ThemeProvider } from '@/app/theme/providers/ThemeProvider.tsx';


export type AppProvidersProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const AppProviders: FC<AppProvidersProps> = memo(function AppProviders (props) {
    const { children } = props;

    return (
        <StrictMode>
            <ErrorBoundary>
                <I18nextProvider i18n={ i18nConfig }>
                    <ThemeProvider
                        isPageTheme={ true }
                        storageId="site-app"
                        withStorage={ true }
                    >
                        { children }
                    </ThemeProvider>
                </I18nextProvider>
            </ErrorBoundary>
        </StrictMode>
    );
});