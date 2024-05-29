import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';


export type UserPageSchema =
    ThunkState
    & {
        user: DomainUserFull | null;
    }