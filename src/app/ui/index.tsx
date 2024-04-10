import { FC, memo, StrictMode } from 'react';
import { I18nextProvider } from 'react-i18next';
import {
    i18nConfig,
    MainSiteRouter,
    ReduxGlobalStoreProvider,
    ThemeProvider,
} from '@/app';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, ScreenHeight } from '@/shared/ui-kit';
import { FooterNavBar, HeaderNavBar } from '@/widgets/navigation';
import '@/shared/styles/index.scss';
import { Toaster } from '@/shared/ui-shad';


export type AppProps = {};

export const App: FC<AppProps> = memo(function App (props) {
    const {} = props;

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
                                <ScreenHeight
                                    footer={ <FooterNavBar/> }
                                >
                                    {/* eslint-disable-next-line react/jsx-max-depth */ }
                                    <HeaderNavBar/>
                                    {/* eslint-disable-next-line react/jsx-max-depth */ }
                                    <MainSiteRouter/>
                                </ScreenHeight>
                                {/* eslint-disable-next-line react/jsx-max-depth */ }
                                <Toaster/>
                            </ErrorBoundary>
                        </ThemeProvider>
                    </BrowserRouter>
                </I18nextProvider>
            </ReduxGlobalStoreProvider>
        </StrictMode>
    );
});