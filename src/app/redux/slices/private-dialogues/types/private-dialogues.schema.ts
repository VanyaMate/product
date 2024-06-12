import { ThunkState } from '@/app/redux/types/thunkError.ts';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';


export type PrivateDialoguesSchema =
    ThunkState &
    {
        dialogues: DomainPrivateDialogueFull[];
        dialoguesStatus: Record<string, ThunkState>;
        withUser: Record<string, ThunkState & { created: boolean }>;
    };