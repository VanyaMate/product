import { RouteProps } from 'react-router-dom';
import { HomePageAsync } from '@/pages/HomePage/ui/HomePage.async.tsx';
import { AboutPageAsync } from '@/pages/AboutPage/ui/AboutPage.async.tsx';
import { ProfilePageAsync } from '@/pages/ProfilePage/ui/ProfilePage.async.tsx';
import { NotFoundPage } from '@/pages/NotFoundPage/ui/NotFoundPage.tsx';
import {
    DialoguesPageAsync,
} from '@/pages/DialoguesPage/ui/DialoguesPage.async.tsx';
import { FriendsPageAsync } from '@/pages/FriendsPage/ui/FriendsPage.async.tsx';
import { SearchPageAsync } from '@/pages/SearchPage/ui/SearchPage.async.tsx';


export enum SiteAppRoute {
    HOME      = 'home',
    ABOUT     = 'about',
    PROFILE   = 'profile',
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
    [SiteAppRoute.DIALOGUE] : '/dialogue/:dialogueId',
    [SiteAppRoute.DIALOGUES]: '/dialogues',
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