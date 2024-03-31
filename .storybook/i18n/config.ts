import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru/translation.json';
import en from './locales/en/translation.json';


i18n
    .use(initReactI18next)
    .init({
        fallbackLng  : 'ru',
        interpolation: {
            escapeValue: false,
        },
        resources    : {
            'ru': {
                translation: ru,
            },
            'en': {
                translation: en,
            },
        },
    });


export default i18n;