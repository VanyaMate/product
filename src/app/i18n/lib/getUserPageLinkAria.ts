import { i18nConfig } from '@/app/i18n/config/i18n.ts';


export const getUserPageLinkAria = function (login: string): string {
    return i18nConfig.t('go_to_user_page_of', {
        ns: 'translation',
        login,
    });
};