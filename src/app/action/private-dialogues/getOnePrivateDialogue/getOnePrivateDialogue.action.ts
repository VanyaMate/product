import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';


export const getOnePrivateDialogueAction = (dialogueId: string) =>
    request(
        `v1/private-dialogues/${ dialogueId }`,
        { method: 'GET' },
        isDomainPrivateDialogueFull,
    );