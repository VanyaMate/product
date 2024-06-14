import { ThunkState } from '@/app/redux/types/thunkError.ts';
import {
    DomainUserWithPermissions,
} from 'product-types/dist/user/DomainUserWithPermissions';


export type SearchUsersSchema =
    ThunkState &
    {
        users: DomainUserWithPermissions[];
        count: number;
        limit: number;
        offset: number;
        query: string;
    };