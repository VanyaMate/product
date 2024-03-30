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
import './configs/i18n/i18n.ts';


export type SiteAppProps = {};

const SiteApp: React.FC<SiteAppProps> = (props) => {
    const {} = props;

    return (
        <React.StrictMode>
            <BrowserRouter>
                <ThemeProvider storageId="site-app" withStorage={ true }>
                    <ErrorBoundary>
                        <ScreenHeight
                            footer={ <FooterNavBar/> }
                        >
                            <HeaderNavBar/>
                            <SiteRouter/>
                        </ScreenHeight>
                    </ErrorBoundary>
                </ThemeProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

export default React.memo(SiteApp);