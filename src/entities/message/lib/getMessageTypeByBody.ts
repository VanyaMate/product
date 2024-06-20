import { DomainMessageType } from 'product-types/dist/message/DomainMessage';
import { isImageUrl } from '@/shared/lib/regexp/isImageUrl.ts';
import { isUrl } from '@/shared/lib/regexp/isUrl.ts';


export const getMessageTypeByBody = function (body: string): DomainMessageType {
    if (isImageUrl.test(body)) {
        return DomainMessageType.IMAGE;
    } else if (isUrl.test(body)) {
        return DomainMessageType.LINK;
    } else {
        return DomainMessageType.TEXT;
    }
};