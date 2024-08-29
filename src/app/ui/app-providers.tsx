import { FC, memo, ComponentPropsWithoutRef, StrictMode } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { ThemeProvider } from '@/app/theme/providers/ThemeProvider.tsx';
import {
    TranslationProvider,
} from '@/features/i18n/provider/TranslationProvider.tsx';


export type AppProvidersProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const AppProviders: FC<AppProvidersProps> = memo(function AppProviders (props) {
    const { children } = props;

    return (
        <StrictMode>
            <ErrorBoundary>
                <TranslationProvider>
                    <ThemeProvider
                        isPageTheme={ true }
                        storageId="site-app"
                        withStorage={ true }
                    >
                        { children }
                    </ThemeProvider>
                </TranslationProvider>
            </ErrorBoundary>
        </StrictMode>
    );
});