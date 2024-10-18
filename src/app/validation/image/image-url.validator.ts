import { Validator } from '@/app/validation/types/validator.ts';
import { isImageUrl } from '@/shared/lib/regexp/isImageUrl.ts';


export const imageUrlValidator: Validator<string> = function (url: string): string {
    if (isImageUrl.test(url)) {
        return '';
    }

    // TODO: Добавить перевод
    return 'Ссылка должна быть на картинку';
};