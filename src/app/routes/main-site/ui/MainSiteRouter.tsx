import { FC, memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainSiteRouteConfig } from '../config/routes';
import { PageLoader } from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


export type SiteRouterProps = {};

export const MainSiteRouter: FC<SiteRouterProps> = memo(function MainSiteRouter (props) {
    const {} = props;

    return (
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
    );
});