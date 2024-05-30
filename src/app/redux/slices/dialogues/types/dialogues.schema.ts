import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainDialogue } from 'product-types/dist/dialog/DomainDialogue';


export type DialoguesSchema =
    ThunkState &
    {
        dialogues: DomainDialogue[];
    };