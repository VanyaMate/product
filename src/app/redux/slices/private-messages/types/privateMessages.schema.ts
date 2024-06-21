import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';


export type PrivateMessagesSchema = Record<string, ThunkState & {
    messages: DomainMessage[];
    lastMessageId: string;
    firstMessageId: string;
    offset: number;
    hasMoreMessage: boolean;
}>;