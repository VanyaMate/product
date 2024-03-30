import { RouteProps } from 'react-router-dom';
import HomePage from '@/apps/SiteApp/containers/pages/HomePage/HomePage.tsx';
import AboutPage from '@/apps/SiteApp/containers/pages/AboutPage/AboutPage.tsx';
import NotFoundPage from '@/apps/SiteApp/containers/pages/NotFoundPage/NotFoundPage.tsx';


export enum SiteAppRoute {
    HOME      = 'home',
    ABOUT     = 'about',
    NOT_FOUND = 'not_found',
}

export const SiteAppRoutePath: Record<SiteAppRoute, string> = {
    [SiteAppRoute.HOME]     : '/',
    [SiteAppRoute.ABOUT]    : '/about',
    [SiteAppRoute.NOT_FOUND]: '*',
};

export const MainSiteRouteConfig: Record<SiteAppRoute, RouteProps> = {
    [SiteAppRoute.HOME]     : {
        path   : SiteAppRoutePath[SiteAppRoute.HOME],
        element: <HomePage/>,
    },
    [SiteAppRoute.ABOUT]    : {
        path   : SiteAppRoutePath[SiteAppRoute.ABOUT],
        element: <AboutPage/>,
    },
    [SiteAppRoute.NOT_FOUND]: {
        path   : SiteAppRoutePath[SiteAppRoute.NOT_FOUND],
        element: <NotFoundPage/>,
    },
};