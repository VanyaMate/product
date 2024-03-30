import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainSiteRouteConfig } from '@/apps/SiteApp/routes/config/routes.tsx';
import PageLoader from '@/components/shared/ui/loaders/PageLoader/PageLoader.tsx';


export type SiteRouterProps = {};

const SiteRouter: React.FC<SiteRouterProps> = (props) => {
    const {} = props;

    return (
        <main>
            <Suspense fallback={ <PageLoader/> }>
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