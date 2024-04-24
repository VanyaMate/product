import { ThunkState } from '@/app/redux/types/thunkError.ts';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';


export type ProfileSchema =
    ThunkState
    & {
        profile: DomainUserFull | null;
    }