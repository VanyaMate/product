import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';


export type PrivateMessagesSearchSchema = Record<string, ThunkState & {
    searchMessages: DomainMessage[];
    query: string;
    offset: number;
    limit: number;
    count: number;
}>