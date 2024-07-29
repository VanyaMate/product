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


export const createLanguageEffect           = effect(createLanguageAction);
export const createLanguageFolderEffect     = effect(createLanguageFolderAction);
export const createLanguageWordEffect       = effect(createLanguageWordAction);
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
    );