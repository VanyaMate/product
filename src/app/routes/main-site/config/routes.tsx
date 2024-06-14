import { RouteProps } from 'react-router-dom';
import { HomePageAsync } from '@/pages/HomePage/ui/HomePage.async.tsx';
import { AboutPageAsync } from '@/pages/AboutPage/ui/AboutPage.async.tsx';
import { UserPageAsync } from '@/pages/ProfilePage/ui/UserPageAsync.tsx';
import { NotFoundPage } from '@/pages/NotFoundPage/ui/NotFoundPage.tsx';
import {
    DialoguesPageAsync,
} from '@/pages/DialoguesPage/ui/DialoguesPage.async.tsx';
import { FriendsPageAsync } from '@/pages/FriendsPage/ui/FriendsPage.async.tsx';
import { SearchPageAsync } from '@/pages/SearchPage/ui/SearchPage.async.tsx';


export const SITE_ROUTE_DIALOGUE_ID = 'dialogueId';
export const SITE_ROUTE_USER_LOGIN  = 'login';

export enum SiteAppRoute {
    HOME      = 'home',
    ABOUT     = 'about',
    USER      = 'user',
    SEARCH    = 'search',
    FRIENDS   = 'friends',
    DIALOGUE  = 'dialogue',
    DIALOGUES = 'dialogues',
    NOT_FOUND = 'not_found',
}

export const SiteAppRoutePath: Record<SiteAppRoute, string> = {
    [SiteAppRoute.HOME]     : '/',
    [SiteAppRoute.FRIENDS]  : '/friends',
    [SiteAppRoute.SEARCH]   : '/search',
    [SiteAppRoute.DIALOGUE] : `/dialogue/:${ SITE_ROUTE_DIALOGUE_ID }`,
    [SiteAppRoute.DIALOGUES]: '/dialogues',
    [SiteAppRoute.ABOUT]    : '/about',
    [SiteAppRoute.USER]     : `/user/:${ SITE_ROUTE_USER_LOGIN }`,
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
    [SiteAppRoute.USER]     : {
        path   : SiteAppRoutePath[SiteAppRoute.USER],
        element: <UserPageAsync/>,
    },
    [SiteAppRoute.DIALOGUES]: {
        path   : SiteAppRoutePath[SiteAppRoute.DIALOGUES],
        element: <DialoguesPageAsync/>,
    },
    [SiteAppRoute.DIALOGUE] : {
        path   : SiteAppRoutePath[SiteAppRoute.DIALOGUE],
        element: <DialoguesPageAsync/>,
    },
    [SiteAppRoute.FRIENDS]  : {
        path   : SiteAppRoutePath[SiteAppRoute.FRIENDS],
        element: <FriendsPageAsync/>,
    },
    [SiteAppRoute.SEARCH]   : {
        path   : SiteAppRoutePath[SiteAppRoute.SEARCH],
        element: <SearchPageAsync/>,
    },
    [SiteAppRoute.NOT_FOUND]: {
        path   : SiteAppRoutePath[SiteAppRoute.NOT_FOUND],
        element: <NotFoundPage/>,
    },
};