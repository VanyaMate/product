import {
    RhfValidatorResponse,
} from '@/app/react-hook-form/types/rhf-validator.ts';
import {
    isLanguageFolderNameValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageFolderNameValidatorRhf/isLanguageFolderNameValidatorRhf.ts';
import {
    isLanguageNameValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageNameValidatorRhf/isLanguageNameValidatorRhf.ts';
import {
    isLanguageWordNameValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageWordNameValidatorRhf/isLanguageWordNameValidatorRhf.ts';
import {
    isLanguageWordTranslationsValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageWordTranslationsValidatorRhf/isLanguageWordTranslationsValidatorRhf.ts';
import {
    isLanguageWordNoticeValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageWordNoticeValidatorRhf/isLanguageWordNoticeValidatorRhf.ts';


export class LanguageRhfValidator {
    static folderName (value: string): RhfValidatorResponse {
        return isLanguageFolderNameValidatorRhf(value);
    }

    static languageName (value: string): RhfValidatorResponse {
        return isLanguageNameValidatorRhf(value);
    }

    static wordName (value: string): RhfValidatorResponse {
        return isLanguageWordNameValidatorRhf(value);
    }

    static wordTranslation (value: string): RhfValidatorResponse {
        return isLanguageWordTranslationsValidatorRhf(value.split(','));
    }

    static wordTranslations (value: Array<string>): RhfValidatorResponse {
        return isLanguageWordTranslationsValidatorRhf(value);
    }

    static wordNotice (value: string): RhfValidatorResponse {
        return isLanguageWordNoticeValidatorRhf(value);
    }
}