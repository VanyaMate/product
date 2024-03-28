import React, { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useTheme } from '@/shared/providers/theme';
import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';


export type MainSiteAppContentProps = {};

const MainSiteAppContent: React.FC<MainSiteAppContentProps> = (props) => {
    const {}              = props;
    const { toggleTheme } = useTheme();

    return (
        <div style={ { minHeight: '100dvh' } }>
            <button onClick={ toggleTheme }>toggle theme</button>
            <hr/>
            <Link to={ '/' }>Main</Link>
            <Link to={ '/about' }>About</Link>
            <Suspense fallback={ <h1>loading..</h1> }>
                <Routes>
                    <Route path={ '/about' } element={ <AboutPage/> }/>
                    <Route path={ '/' } element={ <MainPage/> }/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default React.memo(MainSiteAppContent);