import { RouteProps } from 'react-router-dom';
import { AboutPageAsync, HomePageAsync, NotFoundPage } from '@/pages';


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
        element: <HomePageAsync/>,
    },
    [SiteAppRoute.ABOUT]    : {
        path   : SiteAppRoutePath[SiteAppRoute.ABOUT],
        element: <AboutPageAsync/>,
    },
    [SiteAppRoute.NOT_FOUND]: {
        path   : SiteAppRoutePath[SiteAppRoute.NOT_FOUND],
        element: <NotFoundPage/>,
    },
};