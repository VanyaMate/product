import { effect, store } from '@vanyamate/sec';
import {
    createLanguageAction,
} from '@/app/action/languages/createLanguage/createLanguage.action.ts';
import {
    DomainLanguageWithFolders,
} from 'product-types/dist/language/DomainLanguageWithFolders';
import {
    getMyLanguagesAction,
} from '@/app/action/languages/getMyLanguages/getMyLanguages.action.ts';
import {
    createLanguageWordAction,
} from '@/app/action/languages/createLanguageWord/createLanguageWord.action.ts';
import {
    createLanguageFolderAction,
} from '@/app/action/languages/createLanguageFolder/createLanguageFolder.action.ts';
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';
import {
    getMyLanguageFolderWordsAction,
} from '@/app/action/languages/getMyLanguageFolderWords/getMyLanguageFolderWords.action.ts';
import {
    removeLanguageWordAction,
} from '@/app/action/languages/removeLanguageWord/removeLanguageWord.action.ts';
import {
    updateLanguageAction,
} from '@/app/action/languages/updateLanguage/updateLanguage.action.ts';
import {
    updateLanguageFolderAction,
} from '@/app/action/languages/updateLanguageFolder/updateLanguageFolder.action.ts';
import {
    updateLanguageWordAction,
} from '@/app/action/languages/updateLanguageWord/updateLanguageWord.action.ts';
import {
    removeLanguageAction,
} from '@/app/action/languages/removeLanguage/removeLanguage.action.ts';
import {
    removeLanguageFolderAction,
} from '@/app/action/languages/removeLanguageFolder/removeLanguageFolder.action.ts';


export const createLanguageEffect           = effect(createLanguageAction);
export const createLanguageFolderEffect     = effect(createLanguageFolderAction);
export const createLanguageWordEffect       = effect(createLanguageWordAction);
export const updateLanguageEffect           = effect(updateLanguageAction);
export const updateLanguageFolderEffect     = effect(updateLanguageFolderAction);
export const updateLanguageWordEffect       = effect(updateLanguageWordAction);
export const removeLanguageEffect           = effect(removeLanguageAction);
export const removeLanguageFolderEffect     = effect(removeLanguageFolderAction);
export const removeLanguageWordEffect       = effect(removeLanguageWordAction);
export const getMyLanguagesEffect           = effect(getMyLanguagesAction);
export const getMyLanguageFolderWordsEffect = effect(getMyLanguageFolderWordsAction);


export const $isUserLanguages = store<boolean>(true)
    .on(getMyLanguagesEffect, 'onBefore', () => true);

export const $languagesLoading = store<boolean>(false)
    .on(getMyLanguagesEffect, 'onBefore', () => true)
    .on(getMyLanguagesEffect, 'onSuccess', () => false);

export const $languagesList = store<Array<DomainLanguageWithFolders>>([])
    .on(getMyLanguagesEffect, 'onSuccess', (_, { result }) => result)
    .on(createLanguageEffect, 'onSuccess', (state, { result }) => {
        return $isUserLanguages.get()
               ? [ ...state,
                {
                    folders: [],
                    id     : result.language.id,
                    title  : result.language.title,
                } ]
               : state;
    })
    .on(createLanguageFolderEffect, 'onSuccess', (state, { result }) => {
        return $isUserLanguages.get()
               ? state.map(
                (language) =>
                    language.id === result.language.id
                    ? {
                            ...language,
                            folders: [ ...language.folders, result.folder ],
                        }
                    : language,
            )
               : state;
    })
    .on(updateLanguageEffect, 'onSuccess', (state, { result }) => {
        return state.map((language) => {
            if (language.id === result.language.id) {
                return { ...language, ...result.language };
            }

            return language;
        });
    })
    .on(updateLanguageFolderEffect, 'onSuccess', (state, { result }) => {
        return state.map((language) => {
            if (language.id === result.language.id) {
                const folders = language.folders.map((folder) => {
                    if (folder.id === result.folder.id) {
                        return { ...folder, ...result.folder };
                    }

                    return folder;
                });

                return { ...language, folders };
            }

            return language;
        });
    })
    .on(removeLanguageEffect, 'onSuccess', (state, { result }) => {
        return state.filter((language) => {
            if (language.id === result.language.id) {
                return false;
            }

            return true;
        });
    })
    .on(removeLanguageFolderEffect, 'onSuccess', (state, { result }) => {
        return state.map((language) => {
            if (language.id === result.language.id) {
                const folders = language.folders.filter((folder) => {
                    if (folder.id === result.folder.id) {
                        return false;
                    }

                    return true;
                });

                return { ...language, folders };
            }

            return language;
        });
    });

export const $currentFolderId = store<string>('')
    .on(getMyLanguageFolderWordsEffect, 'onSuccess', (_, { args: [ folderId ] }) => folderId);

export const $languageFolderWordsList = store<Array<DomainLanguageWord>>([])
    .on(getMyLanguageFolderWordsEffect, 'onSuccess', (_, { result }) => result)
    .on(
        createLanguageWordEffect,
        'onSuccess',
        (state, { result, args: [ folderId ] }) => {
            if ($currentFolderId.get() === folderId) {
                return [ ...state, result.word ];
            }
            return state;
        },
    )
    .on(updateLanguageWordEffect, 'onSuccess', (state, { result }) => {
        if ($currentFolderId.get() === result.folder.id) {
            return state.map((word) => {
                if (word.id === result.word.id) {
                    return { ...word, ...result.word };
                }

                return word;
            });
        }

        return state;
    })
    .on(removeLanguageWordEffect, 'onSuccess', (state, { result }) => {
        if ($currentFolderId.get() === result.folder.id) {
            return state.filter((word) => {
                if (word.id === result.word.id) {
                    return false;
                }

                return true;
            });
        }

        return state;
    });