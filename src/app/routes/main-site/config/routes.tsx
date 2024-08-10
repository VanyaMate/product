import { RouteProps } from 'react-router-dom';
import { HomePageAsync } from '@/pages/HomePage/ui/HomePage.async.tsx';
import { AboutPageAsync } from '@/pages/AboutPage/ui/AboutPage.async.tsx';
import { ProfilePageAsync } from '@/pages/ProfilePage/ui/ProfilePageAsync.tsx';
import { NotFoundPage } from '@/pages/NotFoundPage/ui/NotFoundPage.tsx';
import {
    DialoguesPageAsync,
} from '@/pages/DialoguesPage/ui/DialoguesPage.async.tsx';
import { FriendsPageAsync } from '@/pages/FriendsPage/ui/FriendsPage.async.tsx';
import { SearchPageAsync } from '@/pages/SearchPage/ui/SearchPage.async.tsx';
import { FilesPageAsync } from '@/pages/FilesPage/ui/FilesPage.async.tsx';
import {
    LanguagesPageAsync,
} from '@/pages/LanguagesPage/ui/LanguagesPage.async.tsx';
import {
    UserSettingsPageAsync,
} from '@/pages/UserSettingsPage/ui/UserSettingsPage.async.tsx';


export const SITE_ROUTE_DIALOGUE_ID   = 'dialogueId';
export const SITE_ROUTE_USER_LOGIN    = 'login';
export const SITE_ROUTE_FILE_ID       = 'fileId';
export const SITE_ROUTE_SETTINGS_TYPE = 'type';

export enum SiteAppRoute {
    HOME          = 'home',
    ABOUT         = 'about',
    USER          = 'user',
    SETTINGS      = 'settings',
    SETTINGS_TYPE = 'settings-type',
    SEARCH        = 'search',
    FRIENDS       = 'friends',
    DIALOGUE      = 'dialogue',
    DIALOGUES     = 'dialogues',
    FILE          = 'file',
    FILES         = 'files',
    LANGUAGES     = 'languages',
    NOT_FOUND     = 'not_found',
}

export const SiteAppRoutePath: Record<SiteAppRoute, string> = {
    [SiteAppRoute.HOME]         : '/',
    [SiteAppRoute.FRIENDS]      : '/friends',
    [SiteAppRoute.SEARCH]       : '/search',
    [SiteAppRoute.DIALOGUES]    : '/dialogues',
    [SiteAppRoute.DIALOGUE]     : `/dialogues/:${ SITE_ROUTE_DIALOGUE_ID }`,
    [SiteAppRoute.ABOUT]        : '/about',
    [SiteAppRoute.USER]         : `/user/:${ SITE_ROUTE_USER_LOGIN }`,
    [SiteAppRoute.SETTINGS]     : `/settings`,
    [SiteAppRoute.SETTINGS_TYPE]: `/settings/:${ SITE_ROUTE_SETTINGS_TYPE }`,
    [SiteAppRoute.FILE]         : `/file/:${ SITE_ROUTE_FILE_ID }`,
    [SiteAppRoute.FILES]        : `/files`,
    [SiteAppRoute.LANGUAGES]    : `/languages`,
    [SiteAppRoute.NOT_FOUND]    : '*',
};

export const SiteAppRouteConfig: Record<SiteAppRoute, RouteProps> = {
    [SiteAppRoute.HOME]         : {
        path   : SiteAppRoutePath[SiteAppRoute.HOME],
        element: <HomePageAsync/>,
    },
    [SiteAppRoute.ABOUT]        : {
        path   : SiteAppRoutePath[SiteAppRoute.ABOUT],
        element: <AboutPageAsync/>,
    },
    [SiteAppRoute.USER]         : {
        path   : SiteAppRoutePath[SiteAppRoute.USER],
        element: <ProfilePageAsync/>,
    },
    [SiteAppRoute.SETTINGS]     : {
        path   : SiteAppRoutePath[SiteAppRoute.SETTINGS],
        element: <UserSettingsPageAsync/>,
    },
    [SiteAppRoute.SETTINGS_TYPE]: {
        path   : SiteAppRoutePath[SiteAppRoute.SETTINGS_TYPE],
        element: <UserSettingsPageAsync/>,
    },
    [SiteAppRoute.DIALOGUES]    : {
        path   : SiteAppRoutePath[SiteAppRoute.DIALOGUES],
        element: <DialoguesPageAsync/>,
    },
    [SiteAppRoute.DIALOGUE]     : {
        path   : SiteAppRoutePath[SiteAppRoute.DIALOGUE],
        element: <DialoguesPageAsync/>,
    },
    [SiteAppRoute.FRIENDS]      : {
        path   : SiteAppRoutePath[SiteAppRoute.FRIENDS],
        element: <FriendsPageAsync/>,
    },
    [SiteAppRoute.SEARCH]       : {
        path   : SiteAppRoutePath[SiteAppRoute.SEARCH],
        element: <SearchPageAsync/>,
    },
    [SiteAppRoute.FILE]         : {
        path   : SiteAppRoutePath[SiteAppRoute.FILE],
        element: <FilesPageAsync/>,
    },
    [SiteAppRoute.FILES]        : {
        path   : SiteAppRoutePath[SiteAppRoute.FILES],
        element: <FilesPageAsync/>,
    },
    [SiteAppRoute.LANGUAGES]    : {
        path   : SiteAppRoutePath[SiteAppRoute.LANGUAGES],
        element: <LanguagesPageAsync/>,
    },
    [SiteAppRoute.NOT_FOUND]    : {
        path   : SiteAppRoutePath[SiteAppRoute.NOT_FOUND],
        element: <NotFoundPage/>,
    },
};