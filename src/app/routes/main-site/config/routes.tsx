import { RouteProps } from 'react-router-dom';
import { HomePageAsync } from '@/pages/HomePage/ui/HomePage.async.tsx';
import { AboutPageAsync } from '@/pages/AboutPage/ui/AboutPage.async.tsx';
import { ProfilePageAsync } from '@/pages/ProfilePage/ui/ProfilePage.async.tsx';
import { NotFoundPage } from '@/pages/NotFoundPage/ui/NotFoundPage.tsx';


export enum SiteAppRoute {
    HOME      = 'home',
    ABOUT     = 'about',
    PROFILE   = 'profile',
    NOT_FOUND = 'not_found',
}

export const SiteAppRoutePath: Record<SiteAppRoute, string> = {
    [SiteAppRoute.HOME]     : '/',
    [SiteAppRoute.ABOUT]    : '/about',
    [SiteAppRoute.PROFILE]  : '/profile/:login',
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
    [SiteAppRoute.PROFILE]  : {
        path   : SiteAppRoutePath[SiteAppRoute.PROFILE],
        element: <ProfilePageAsync/>,
    },
    [SiteAppRoute.NOT_FOUND]: {
        path   : SiteAppRoutePath[SiteAppRoute.NOT_FOUND],
        element: <NotFoundPage/>,
    },
};