import { ThunkState } from '@/app/redux/types/thunkError.ts';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';


export type PrivateDialoguesSchema =
    ThunkState &
    {
        dialogues: DomainPrivateDialogueFull[];
        dialoguesStatus: Record<string, ThunkState>;
        dialogueSearch: Record<string, DomainMessage[]>;
        withUser: Record<string, ThunkState & { created: boolean }>;
    };