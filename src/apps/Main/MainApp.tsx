import React from 'react';
import '../../styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '../../theme/ThemeProvider';
import MainAppContent from './MainAppContent';


export type AppProps = {};

const MainApp: React.FC<AppProps> = (props) => {
    const {} = props;

    return (
        <BrowserRouter>
            <ThemeProvider withStorage={ true } storageId={ 'header' }>
                <MainAppContent/>
            </ThemeProvider>
            <ThemeProvider withStorage={ true } storageId={ 'footer' }>
                <MainAppContent/>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default React.memo(MainApp);