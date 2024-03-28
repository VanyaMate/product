import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainSiteRouteConfig } from '..';


export type MainSiteRouterProps = {};

const MainSiteRouter: React.FC<MainSiteRouterProps> = (props) => {
    const {} = props;

    return (
        <Suspense fallback={ <h1>loading..</h1> }>
            <Routes>
                {
                    Object.values(MainSiteRouteConfig).map(({ path, element }) => (
                        <Route element={ element } path={ path } key={ path }/>
                    ))
                }
            </Routes>
        </Suspense>
    );
};

export default React.memo(MainSiteRouter);