import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainSiteRouteConfig } from '@/apps/SiteApp/routes/config/routes.tsx';


export type SiteRouterProps = {};

const SiteRouter: React.FC<SiteRouterProps> = (props) => {
    const {} = props;

    return (
        <main>
            <Suspense fallback="TODO: Add loader">
                <Routes>
                    {
                        Object.values(MainSiteRouteConfig).map((route) => (
                            <Route
                                element={ route.element }
                                key={ route.path }
                                path={ route.path }
                            />
                        ))
                    }
                </Routes>
            </Suspense>
        </main>
    );
};

export default React.memo(SiteRouter);