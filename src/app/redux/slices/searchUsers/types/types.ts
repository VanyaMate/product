import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export type SearchUsersSchema =
    ThunkState &
    {
        users: DomainUser[];
        count: number;
        limit: number;
        offset: number;
        query: string;
    };