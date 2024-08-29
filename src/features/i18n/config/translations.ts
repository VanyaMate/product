import { TranslationLanguage } from '@/features/i18n/types/language.ts';
import { Translation } from '@/features/i18n/types/translations.ts';
import ru_app from '@/app/i18n/translations/ru/site-app.json';
import en_app from '@/app/i18n/translations/ru/site-app.json';
import ru_buttons from '@/app/i18n/translations/ru/buttons.json';
import en_buttons from '@/app/i18n/translations/ru/buttons.json';
import ru_validation from '@/app/i18n/translations/ru/validation-messages.json';
import en_validation from '@/app/i18n/translations/ru/validation-messages.json';
import ru_contacts from '@/app/i18n/translations/ru/contacts.json';
import en_contacts from '@/app/i18n/translations/ru/contacts.json';
import ru_files from '@/app/i18n/translations/ru/files-page.json';
import en_files from '@/app/i18n/translations/ru/files-page.json';
import ru_dialogues from '@/app/i18n/translations/ru/dialogue.json';
import en_dialogues from '@/app/i18n/translations/ru/dialogue.json';
import ru_posts from '@/app/i18n/translations/ru/posts.json';
import en_posts from '@/app/i18n/translations/ru/posts.json';
import ru_friends from '@/app/i18n/translations/ru/friends-page.json';
import en_friends from '@/app/i18n/translations/ru/friends-page.json';
import ru_languages from '@/app/i18n/translations/ru/languages.json';
import en_languages from '@/app/i18n/translations/ru/languages.json';
import ru_userSettings from '@/app/i18n/translations/ru/user-settings.json';
import en_userSettings from '@/app/i18n/translations/ru/user-settings.json';
import ru_notification_title
    from '@/app/i18n/translations/ru/notification-messages.json';
import en_notification_title
    from '@/app/i18n/translations/ru/notification-messages.json';
import ru_notification_message
    from '@/app/i18n/translations/ru/notification-links.json';
import en_notification_message
    from '@/app/i18n/translations/ru/notification-links.json';
import ru_notification_helpers
    from '@/app/i18n/translations/ru/notifications.json';
import en_notification_helpers
    from '@/app/i18n/translations/ru/notifications.json';


export const translations: Record<TranslationLanguage, Translation> = {
    ru: {
        app          : ru_app,
        buttons      : ru_buttons,
        validation   : ru_validation,
        contacts     : ru_contacts,
        page         : {
            files       : ru_files,
            dialogues   : ru_dialogues,
            posts       : ru_posts,
            friends     : ru_friends,
            languages   : ru_languages,
            userSettings: ru_userSettings,
        },
        notifications: {
            title  : ru_notification_title,
            message: ru_notification_message,
            helpers: ru_notification_helpers,
        },
    },
    en: {
        app          : en_app,
        buttons      : en_buttons,
        validation   : en_validation,
        contacts     : en_contacts,
        page         : {
            files       : en_files,
            dialogues   : en_dialogues,
            posts       : en_posts,
            friends     : en_friends,
            languages   : en_languages,
            userSettings: en_userSettings,
        },
        notifications: {
            title  : en_notification_title,
            message: en_notification_message,
            helpers: en_notification_helpers,
        },
    },
};