import { SiteAppRoute } from '@/app/routes/main-site/config/routes.tsx';


export const getUserPageUrl = function (login: string): string {
    return `/${ SiteAppRoute.USER }/${ login }`;
};