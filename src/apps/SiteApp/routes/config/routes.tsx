import { RouteProps } from 'react-router-dom';
import HomePage from '@/apps/SiteApp/containers/pages/HomePage/HomePage.tsx';
import AboutPage from '@/apps/SiteApp/containers/pages/AboutPage/AboutPage.tsx';


export enum SiteAppRoute {
    HOME  = 'home',
    ABOUT = 'about'
}

export const SiteAppRoutePath: Record<SiteAppRoute, string> = {
    [SiteAppRoute.HOME] : '/',
    [SiteAppRoute.ABOUT]: '/about',
};

export const MainSiteRouteConfig: Record<SiteAppRoute, RouteProps> = {
    [SiteAppRoute.HOME] : {
        path   : SiteAppRoutePath[SiteAppRoute.HOME],
        element: <HomePage/>,
    },
    [SiteAppRoute.ABOUT]: {
        path   : SiteAppRoutePath[SiteAppRoute.ABOUT],
        element: <AboutPage/>,
    },
};