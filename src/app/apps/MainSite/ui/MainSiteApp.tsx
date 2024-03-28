import React from 'react';
import '@/app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import MainAppContent from './MainSiteAppContent';
import { ThemeProvider } from '@/shared/providers/theme';


export type MainSiteAppProps = {};

const MainSiteApp: React.FC<MainSiteAppProps> = (props) => {
    const {} = props;

    return (
        <BrowserRouter>
            <ThemeProvider withStorage={ true } storageId={ 'main-app-header' }>
                <MainAppContent/>
            </ThemeProvider>
            <ThemeProvider withStorage={ true } storageId={ 'main-app-footer' }>
                <MainAppContent/>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default React.memo(MainSiteApp);