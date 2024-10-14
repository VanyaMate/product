import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction, useCallback,
    useState,
} from 'react';
import { getCurrentLanguage } from '@/features/i18n/lib/getCurrentLanguage.ts';
import { TranslationLanguage } from '@/features/i18n/types/language.ts';
import {
    LOCAL_STORAGE_SELECTED_LANGUAGE,
} from '@/features/i18n/config/const.ts';


export type TranslationContextType = {
    language: TranslationLanguage;
    setLanguage: Dispatch<SetStateAction<TranslationLanguage>>;
}

export const TranslationContext = createContext<TranslationContextType>({
    language   : 'ru',
    setLanguage: () => {
    },
});

export const TranslationProvider: FC<{ children: ReactNode }> = (props) => {
    const { children }              = props;
    const [ language, setLanguage ] = useState<TranslationLanguage>(getCurrentLanguage());

    const setLanguageHandler = useCallback(function (language: TranslationLanguage) {
        setLanguage(language);
        document.documentElement.setAttribute('lang', language);
        localStorage.setItem(LOCAL_STORAGE_SELECTED_LANGUAGE, language);
    }, []);

    return (
        <TranslationContext.Provider
            value={ { language, setLanguage: setLanguageHandler } }
        >
            { children }
        </TranslationContext.Provider>
    );
};