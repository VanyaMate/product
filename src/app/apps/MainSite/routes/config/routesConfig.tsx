import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';


export enum MainSiteRoutes {
    MAIN  = 'main',
    ABOUT = 'about'
}

export const MainSiteRoutePath: Record<MainSiteRoutes, string> = {
    [MainSiteRoutes.MAIN] : '/',
    [MainSiteRoutes.ABOUT]: '/about',
};

export const MainSiteRouteConfig: Record<MainSiteRoutes, RouteProps> = {
    [MainSiteRoutes.MAIN] : {
        path   : MainSiteRoutePath.main,
        element: <MainPage/>,
    },
    [MainSiteRoutes.ABOUT]: {
        path   : MainSiteRoutePath.about,
        element: <AboutPage/>,
    },
};