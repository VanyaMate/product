import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SiteRouter from './routes/SiteRouter';
import HeaderNavBar
    from '@/apps/SiteApp/containers/widgets/navigation/HeaderNavBar/HeaderNavBar.tsx';
import FooterNavBar
    from '@/apps/SiteApp/containers/widgets/navigation/FooterNavBar/FooterNavBar.tsx';
import ThemeProvider
    from '@/components/shared/ui/theme/ThemeContext/providers/ThemeProvider.tsx';
import ScreenHeight from '@/components/shared/ui/screen/ScreenHeight/ScreenHeight.tsx';
import ErrorBoundary from '@/components/shared/ui/errors/ErrorBoundary/ErrorBoundary.tsx';
import i18n from './configs/i18n/i18n.ts';
import { I18nextProvider } from 'react-i18next';


export type SiteAppProps = {};

const SiteApp: React.FC<SiteAppProps> = (props) => {
    const {} = props;

    return (
        <React.StrictMode>
            <I18nextProvider i18n={ i18n }>
                <BrowserRouter>
                    <ThemeProvider storageId="site-app" withStorage={ true }>
                        <ErrorBoundary>
                            <ScreenHeight
                                footer={ <FooterNavBar/> }
                            >
                                {/* eslint-disable-next-line react/jsx-max-depth */}
                                <HeaderNavBar/>
                                {/* eslint-disable-next-line react/jsx-max-depth */}
                                <SiteRouter/>
                            </ScreenHeight>
                        </ErrorBoundary>
                    </ThemeProvider>
                </BrowserRouter>
            </I18nextProvider>
        </React.StrictMode>
    );
};

export default React.memo(SiteApp);