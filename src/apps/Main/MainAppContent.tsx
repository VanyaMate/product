import React, { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AboutPageAsync from '../../pages/AboutPage/AboutPage.async';
import MainPageAsync from '../../pages/MainPage/MainPage.async';
import { useTheme } from '../../theme/useTheme';


export type MainAppContentProps = {};

const MainAppContent: React.FC<MainAppContentProps> = (props) => {
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
                    <Route path={ '/about' } element={ <AboutPageAsync/> }/>
                    <Route path={ '/' } element={ <MainPageAsync/> }/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default React.memo(MainAppContent);