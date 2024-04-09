import { FC, memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '@/shared/ui-kit';
import { MainSiteRouteConfig } from '../config/routes';


export type SiteRouterProps = {};

export const MainSiteRouter: FC<SiteRouterProps> = memo(function MainSiteRouter (props) {
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
});