import { ThunkState } from '@/app/redux/types/thunkError.ts';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import {
    DomainServiceErrorItem,
} from 'product-types/dist/error/DomainServiceErrorItem';


export type PrivateDialoguesSchema =
    ThunkState &
    {
        dialogues: DomainPrivateDialogueFull[];
        dialoguesStatus: Record<string, ThunkState>;
        dialogueSearch: Record<string, {
            messages: DomainMessage[],
            options: DomainSearchItemOptions,
            count: number
            isPending: boolean;
            error: DomainServiceErrorItem | null;
        }>;
        withUser: Record<string, ThunkState & { created: boolean }>;
    };